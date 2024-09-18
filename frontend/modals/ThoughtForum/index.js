import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useRoute } from '@react-navigation/native';
import styles from "./styles";
import { generateClient } from "aws-amplify/api";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getThought } from "../../src/graphql/queries";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { getNearbyComments } from "../../slices/getNearbyComments";
import Comment from "../../components/Comment";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useNavigation } from "@react-navigation/native";
import { checkAnswered } from "../../data/voteOnPoll";
import { getThoughtWithDetails } from "../../utils/customQueries";
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";

const ThoughtForum = () => {
    const route = useRoute();
    const dispatch = useDispatch()
    const client = generateClient()
    const { id } = route.params || {};
    const [parent, setParent] = useState(null)
    const inputRef = useRef(null)
    const navigation = useNavigation()

    // thought related
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0)
    const [answered, setAnswered] = useState(false);
    const [localVoteCount, setLocalVoteCount] = useState(0)
    const [answeredOption, setAnsweredOption] = useState("");
    // music related
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const soundRef = useRef(sound);
    const isPlayingRef = useRef(isPlaying);
    const trackRef = useRef(parent?.music);
    const [progress, setProgress] = useState(0);
    const [track, setTrack] = useState()
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const [loadingSong, setLoadingSong] = useState(false)

    const getSong = async () => {
        setLoadingSong(true)
        const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
        console.log(spotifyAuth)
        if (spotifyAuth && spotifyAuth == "true") {
            if (parent?.music) {
                setSpotifyAuth(true)
                const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
                const expiryTime = new Date(expiryString);
                const currentTime = new Date();
                if (currentTime >= expiryTime) {
                    await refreshAccessToken()
                    console.log("NEW access token has been updated")
                }
                const accessToken = await AsyncStorage.getItem("spotifyAccessToken")

                try {
                    const response = await fetch(`https://api.spotify.com/v1/tracks/${parent?.music}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        setSpotifyAuth(true)
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    console.log("running get song")
                    const trackData = await response.json();
                    console.log("track data: ", trackData)
                    setTrack(trackData)
                } catch (error) {
                    console.log("Error: ", error)
                } finally {
                    setLoadingSong(true)
                }
            }
        } else {
            setSpotifyAuth(false)
            setLoadingSong(false)
        }
    }

    useEffect(() => {
        soundRef.current = sound;
        isPlayingRef.current = isPlaying;
        trackRef.current = track;
        console.log(
            "check if looping"
        )
    }, []);

    const playSound = useCallback(async () => {
        if (trackRef.current && trackRef.current.preview_url) {
            try {
                if (soundRef.current) {
                    await soundRef.current.unloadAsync();
                }
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: trackRef.current.preview_url },
                    { shouldPlay: true }
                );

                soundRef.current = newSound;
                setSound(newSound);
                setIsPlaying(true);

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded && status.isPlaying) {
                        const currentProgress = status.positionMillis / status.durationMillis;
                        setProgress(currentProgress);
                    }
                    if (status.didJustFinish) {
                        soundRef.current.unloadAsync();
                        setSound(null);
                        setIsPlaying(false);
                        setProgress(0)
                    }
                });

                await newSound.playAsync();
            } catch (error) {
                console.error("Error playing sound:", error);
            }
        }
    }, []);

    const { nearbyComments, loading } = useSelector((state) => state.getNearbyCommentsSlice);

    const getParentThought = async (id) => {
        if (id) {
            try {
                const thought = (await client.graphql({
                    query: getThoughtWithDetails,
                    variables: {
                        id: id
                    }
                })).data.getThought
                setParent(thought)
                return thought
            } catch (error) {
                console.log("error getting parent thought: ", error)
                return null
            }
        }
    }

    const init = async (thought) => {
        if (thought) {
            await getSong()
            dispatch(getNearbyComments(thought));
            let likeStatus = await checkLiked(thought)
            setLiked(likeStatus)
            setLikeCount(thought?.likes)
            setCommentCount(thought?.totalReplies)
            const answerId = await checkAnswered(thought);
            if (answerId) {
                setAnswered(true)
                console.log("answered set to true")
                for (option of thought?.options?.items) {
                    if (option?.id == answerId) {
                        setLocalVoteCount(option.votes)
                    }
                }
                setAnsweredOption(answerId)
            }
        }
    }

    const fetchAndInitialize = async () => {
        const thought = await getParentThought(id);
        if (thought) {
            await init(thought);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchAndInitialize();
            return () => {
                setLikeCount(0);
                setLiked(false);
                setAnswered(false);
                setAnsweredOption("");
                setLocalVoteCount(0);
                clearOpenReplySectionState();
                if (soundRef.current) {
                    soundRef.current.stopAsync().then(() => {
                        soundRef.current.unloadAsync();
                        setSound(null);
                        setIsPlaying(false);
                    });
                }
            };
        }, [])
    );

    const renderComment = ({ item }) => (
        <Comment comment={item} setParent={setParent} inputRef={inputRef} />
    );

    const handleLike = async (thought) => {
        setLiked(true);
        setLikeCount(likeCount + 1);
        await likeThought(thought, true);
        // dispatch(getNearbyThoughts(userHash))
    };

    const handleDislike = async (thought) => {
        setLiked(false);
        setLikeCount(likeCount - 1);
        await likeThought(thought, false);
        // dispatch(getNearbyThoughts(userHash))
    };

    const togglePlayPause = useCallback(async () => {
        if (soundRef.current) {
            if (isPlayingRef.current) {
                await soundRef.current.pauseAsync();
                setIsPlaying(false);
            } else {
                await soundRef.current.playAsync();
                setIsPlaying(true);
            }
        } else {
            playSound();
        }
    }, []);

    useEffect(() => {
        if (track && track.preview_url) {
            playSound();
        }
    }, [track]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                clearOpenReplySectionState();
                const currentSound = soundRef.current;
                if (soundRef.current) {
                    soundRef.current.stopAsync().then(() => {
                        soundRef.current.unloadAsync();
                        setSound(null);
                        setIsPlaying(false);
                    });
                }
            };
        }, [dispatch, parent])
    );

    const clearOpenReplySectionState = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const openReplyKeys = keys.filter(key => key.startsWith('openReplySection-'));
            await AsyncStorage.multiRemove(openReplyKeys);
        } catch (error) {
            console.error("Error clearing open reply section state:", error);
        }
    };

    return (
        <>
            {loading === "succeeded" ? (
                <View style={styles.container} >
                    <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 100 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                        {parent ? (
                            <FlatList
                                data={nearbyComments}
                                renderItem={renderComment}
                                keyExtractor={(item, index) => item.id || index.toString()}
                                ListHeaderComponent={
                                    <>
                                        <ThoughtForumThought
                                            thought={parent}
                                            liked={liked}
                                            likeCount={likeCount}
                                            handleDislike={handleDislike}
                                            handleLike={handleLike}
                                            commentCount={commentCount}
                                            setParent={setParent}
                                            answered={answered}
                                            setAnswered={setAnswered}
                                            localVoteCount={localVoteCount}
                                            setLocalVoteCount={setLocalVoteCount}
                                            answeredOption={answeredOption}
                                            setAnsweredOption={setAnsweredOption}
                                            togglePlayPause={togglePlayPause}
                                            isPlaying={isPlaying}
                                            track={track}
                                            progress={progress}
                                            loadingSong={loadingSong}
                                            setLoadingSong={setLoadingSong}
                                        />
                                        <Text style={{ color: "white", paddingTop: 16, paddingLeft: 16, fontSize: 18 }}>Comments</Text>
                                    </>
                                }
                                contentContainerStyle={styles.commentsContainer}
                            />
                        ) : (
                            <Text style={{ color: "white", textAlign: "center", paddingHorizontal: 50 }}>sorry, the thought you are looking for has been deleted</Text>
                        )}
                    </KeyboardAvoidingView>
                </View >
            ) : (
                <View style={styles.container}>
                    <View style={styles.contentLoaderContainer}>
                        <ContentLoader
                            height={70}
                            speed={1}
                            backgroundColor={'#333'}
                            foregroundColor={'#999'}
                            viewBox="0 0 380 70"
                        >
                            <Circle cx="30" cy="30" r="30" />
                            <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                            <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                        </ContentLoader>
                    </View>
                </View>
            )}
        </>
    );
};

export default ThoughtForum;