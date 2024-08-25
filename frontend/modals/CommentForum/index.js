import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import Comment from "../../components/Comment";
import createOneComment from "../../data/createOneComment";
import { getNearbyComments } from "../../slices/getNearbyComments";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import replyOnComment from "../../data/replyOnComment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sendArrow from "../../assets/sendArrow.png";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Audio } from 'expo-av';


const CommentForum = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const {
        thought,
        likeCount,
        liked,
        handleLike,
        handleDislike,
        commentCount,
        setCommentCount,
        answered,
        setAnswered,
        localVoteCount,
        setLocalVoteCount,
        answeredOption,
        setAnsweredOption,
        track } = route.params;
    const [localCommentCount, setLocalCommentCount] = useState(commentCount);

    const [inputHeight, setInputHeight] = useState("auto");
    const [content, setContent] = useState("");
    const [parent, setParent] = useState(thought);
    console.log(parent)
    const inputRef = useRef(null)

    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const soundRef = useRef(sound);
    const isPlayingRef = useRef(isPlaying);
    const trackRef = useRef(track);
    const [progress, setProgress] = useState(0);


    const { nearbyComments, loading } = useSelector((state) => state.getNearbyCommentsSlice);


    const commentOnThought = async () => {
        if (content.length > 0) {
            setContent("");
            setCommentCount(localCommentCount + 1);
            setLocalCommentCount(localCommentCount + 1);
            await createOneComment(thought, content);
            dispatch(getNearbyComments(thought));
            const hash = await AsyncStorage.getItem("@hash")
            console.log(hash)
            dispatch(getNearbyThoughts(hash))
            console.log("dispatch worked")
        }
    };

    const replyToComment = async () => {
        if (content.length > 0) {
            setContent("");
            await replyOnComment(thought, parent, content);
            setCommentCount(localCommentCount + 1);
            setLocalCommentCount(localCommentCount + 1);
            const hash = await AsyncStorage.getItem("@hash")
            dispatch(getNearbyThoughts(hash))
        }
    };

    const clearOpenReplySectionState = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const openReplyKeys = keys.filter(key => key.startsWith('openReplySection-'));
            await AsyncStorage.multiRemove(openReplyKeys);
        } catch (error) {
            console.error("Error clearing open reply section state:", error);
        }
    };


    useEffect(() => {
        soundRef.current = sound;
        isPlayingRef.current = isPlaying;
        trackRef.current = track;
        console.log(
            "loop"
        )
    }, [sound, isPlaying, track]);

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
    }, [track, playSound]);

    useFocusEffect(
        useCallback(() => {
            dispatch(getNearbyComments(thought));
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
        }, [dispatch, thought])
    );

    const renderComment = ({ item }) => (
        <Comment comment={item} setParent={setParent} inputRef={inputRef} />
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 100 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                {loading == "succeeded" ? (
                    <FlatList
                        data={nearbyComments}
                        renderItem={renderComment}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        ListHeaderComponent={
                            <>
                                <ThoughtForumThought
                                    thought={thought}
                                    liked={liked}
                                    likeCount={likeCount}
                                    handleDislike={handleDislike}
                                    handleLike={handleLike}
                                    commentCount={localCommentCount}
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
                                    progress={progress} />
                                <Text style={{ color: "white", paddingTop: 16, paddingLeft: 16, fontSize: 18 }}>Comments</Text>
                            </>
                        }
                        contentContainerStyle={styles.commentsContainer}
                    />
                ) : (
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
                )}
                {/*input*/}
                <View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
                        ref={inputRef}
                        style={[styles.input, { height: inputHeight, minHeight: 20 }]}
                        value={content}
                        marginBottom={0}
                        keyboardAppearance="dark"
                        onChangeText={setContent}
                        placeholder={parent.__typename == "Thought" ? `Comment on @${parent.author.displayName}'s thought` : `Replying to @${parent.author.displayName}'s comment`}
                        placeholderTextColor="#888"
                        multiline={true}
                        onContentSizeChange={(event) => {
                            const newHeight = event.nativeEvent.contentSize.height;
                            setInputHeight(newHeight > 100 ? 100 : newHeight);
                        }}
                    />
                    <TouchableOpacity onPress={parent.__typename == "Thought" ? commentOnThought : replyToComment}>
                        <Image source={sendArrow} style={styles.sendArrow} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CommentForum;