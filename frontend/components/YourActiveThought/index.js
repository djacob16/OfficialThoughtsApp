import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing, FastImage } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import commentIcon from "../../assets/message.png";
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import editOneThought from "../../data/editOneThought";
import { checkLiked, likeThought } from "../../data/likeThought";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import parkedIcon from "../../assets/mappinParked.png";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import DancingBars from "../DancingBars";
import mute from "../../assets/speaker.slash.fill.png";
import unmute from "../../assets/speaker.wave.2.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { Audio } from 'expo-av';
import { Colors } from "../../constants/colors";
import { vote, checkAnswered } from "../../data/voteOnPoll";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";

const YourActiveThought = ({ activeThought }) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.userSlice.user);
    const [animatedValue] = useState(new Animated.Value(0));
    const [likeCount, setLikeCount] = useState(activeThought.likes || 0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0)
    const dispatch = useDispatch()
    const [userHash, setUserHash] = useState("")
    const [answered, setAnswered] = useState(false);
    const [localVoteCount, setLocalVoteCount] = useState(0)
    const [answeredOption, setAnsweredOption] = useState("");
    const [track, setTrack] = useState(null)
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const [loadingSong, setLoadingSong] = useState(false)

    useEffect(() => {
        const init = async () => {
            setCommentCount(activeThought.totalReplies)
            setLikeCount(activeThought.likes);
            const isLiked = await checkLiked(activeThought);
            setLiked(isLiked);
            const answerId = await checkAnswered(activeThought);
            if (answerId) {
                for (option of activeThought.options.items) {
                    if (option.id == answerId) {
                        setLocalVoteCount(option.votes)
                    }
                }
                setAnsweredOption(answerId)
                setAnswered(true)
            }
            setUserHash(await AsyncStorage.getItem('@hash'))
        }
        init();
        getSong();
    }, [activeThought]);

    const getSong = async () => {
        const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
        if (spotifyAuth && spotifyAuth == "true") {
            setSpotifyAuth(true)
            setLoadingSong(true)
            const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
            const expiryTime = new Date(expiryString);
            const currentTime = new Date();
            if (currentTime >= expiryTime) {
                await refreshAccessToken()
                console.log("NEW access token has been updated")
            }
            const accessToken = await AsyncStorage.getItem("spotifyAccessToken")
            if (activeThought.music) {
                try {
                    const response = await fetch(`https://api.spotify.com/v1/tracks/${activeThought.music}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        setSpotifyAuth(true)
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const trackData = await response.json();
                    setTrack(trackData)
                    setLoadingSong(false)
                } catch (error) {
                    console.log("Error: ", error)
                    setLoadingSong(false)
                }
            }
        } else {
            setSpotifyAuth(false)
        }
    }

    const handleLike = async (activeThought) => {
        setLiked(true);
        setLikeCount(prevLikeCount => prevLikeCount + 1);
        await likeThought(activeThought, true);
        dispatch(getNearbyThoughts(userHash))
    };

    const handleDislike = async (activeThought) => {
        setLiked(false);
        setLikeCount(prevLikeCount => prevLikeCount - 1);
        await likeThought(activeThought, false);
        dispatch(getNearbyThoughts(userHash))
    };

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 550,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }, [activeThought]);

    const edit = () => {
        navigation.navigate("EditThought", { activeThought, setAnswered });
    };

    const deleteFunc = async () => {
        const response = await deleteOneThought(activeThought.id);
        // console.log(response)
        if (response.status === "success") {
            dispatch(getActiveThoughts())
            Toast.show({
                type: 'success',
                text1: 'Thought deleted successfully!',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error deleting thought',
            });
        }
    };

    const toggleActiveStatus = async () => {
        const newActiveStatus = !activeThought.active;

        await editOneThought(
            activeThought.id,
            activeThought.content,
            newActiveStatus,
            activeThought.parked,
            activeThought.anonymous
        );
        dispatch(getNearbyThoughts(userHash))
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 350,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    };

    const animatedStyle = {
        opacity: animatedValue,
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                }),
            },
        ],
    };

    const onVote = async (option, thought) => {
        await vote(thought, option);
        setAnsweredOption(option.id)
        setLocalVoteCount(option.votes + 1)
        setAnswered(true)
        dispatch(getNearbyThoughts(userHash))
    }

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity style={styles.container}
                onPress={() => navigation.navigate("CommentForum", {
                    thought: activeThought,
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
                    track
                })}>
                <View style={styles.profileContainer}>
                    {activeThought?.anonymous ? (
                        <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: activeThought.author.id })}>
                            <Image source={{ uri: activeThought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {activeThought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{user?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        {activeThought.content && <Text style={styles.content}>{activeThought.content}</Text>}
                        <TouchableOpacity>
                            {(activeThought.photo?.slice(-4) === ".jpg" || activeThought.photo?.slice(-4) === ".png") && <Image source={{ uri: activeThought.photo }} style={styles.photo} />}
                            {activeThought.photo?.slice(-4) === ".mp4" && <Video source={{ uri: activeThought.photo }} resizeMode="contain" controls={true} style={styles.video} />}
                        </TouchableOpacity>
                        {spotifyAuth ? (
                            <>
                                {activeThought?.music && track &&
                                    <>
                                        {loadingSong ? (
                                            <View style={styles.trackContainerHighlighted}>
                                                <View style={styles.albumImageContianer}>
                                                    <View style={{ width: 55, height: 55, borderRadius: 5, backgroundColor: Colors.lightGray }} />
                                                </View>
                                                <View style={styles.trackInfoContainer}>
                                                    <View style={{ width: 145, height: 15, borderRadius: 5, backgroundColor: Colors.lightGray }}></View>
                                                    <View style={{ width: 55, height: 15, borderRadius: 5, backgroundColor: Colors.lightGray }}></View>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.trackContainerHighlighted}>
                                                <View style={styles.albumImageContianer}>
                                                    <Image source={{ uri: track?.album?.images[0]?.url }} resizeMode="cover" style={{ width: 55, height: 55, borderRadius: 5 }} />
                                                </View>
                                                <View style={styles.trackInfoContainer}>
                                                    <Text style={styles.trackTitle}>{track.name}</Text>
                                                    <Text style={styles.artistTitle}>- {track.artists.map(artist => artist.name).join(', ')}</Text>
                                                </View>
                                                {track.preview_url ? (
                                                    <View style={styles.playButtonContainer}>
                                                        <DancingBars />
                                                    </View>
                                                ) : (
                                                    <View style={styles.playButtonContainer}>
                                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1, borderRadius: 50 }}>
                                                            <Image source={spotifyLogo} style={{ width: 25, height: 25, opacity: 0.5 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </>
                                }
                            </>
                        ) : activeThought.music ? (

                            <TouchableOpacity style={styles.trackContainerHighlighted} onPress={() => navigation.navigate("ConnectSpotify")}>
                                <View style={styles.albumImageContianer}>
                                    <View style={{ width: 55, height: 55, borderRadius: 5, backgroundColor: Colors.lightGray, justifyContent: "center", alignItems: "center" }}>
                                        <Image source={spotifyLogo} style={{ width: 25, height: 25, opacity: 0.5 }} />
                                    </View>
                                </View>
                                <View style={styles.trackInfoContainer}>
                                    <Text style={{ color: "white" }}>To expienece music on our app, connect to spotify </Text>
                                </View>
                            </TouchableOpacity>

                        ) : (
                            <></>
                        )}
                        {activeThought.poll && (
                            <View style={styles.optionsContainer}>
                                {activeThought.options.items.map((option, index) => (
                                    <TouchableOpacity key={index} style={answeredOption == option.id ? styles.optionContainerHighlighted : styles.optionContainer} onPress={answered ? () => { } : () => onVote(option, activeThought)}>
                                        <Text style={styles.optionText}>{option.content}</Text>
                                        {answered && <Text style={styles.optionText}>{answeredOption == option.id ? localVoteCount : option.votes}</Text>}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.thoughtInteractions}>
                        <TouchableOpacity
                            style={styles.interactionNumber}
                            onPress={liked ? () => handleDislike(activeThought) : () => handleLike(activeThought)}
                        >
                            {liked ? (
                                <Image
                                    source={heartFillIcon}
                                    style={styles.icon}
                                />
                            ) : (
                                <Image
                                    source={heartIcon}
                                    style={styles.icon}
                                />
                            )}
                            <Text style={styles.number}>
                                {likeCount}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.interactionNumber}>
                            <Image source={commentIcon} style={styles.icon} />
                            <Text style={styles.number}>{commentCount}</Text>
                        </View>
                        {activeThought.parked &&
                            <View style={styles.parkedDistance}>
                                <Image style={styles.parkedIcon} source={parkedIcon} />
                                <Text style={styles.parkedText}>15</Text>
                            </View>
                        }
                        <TouchableOpacity style={styles.interactionNumber} onPress={edit}>
                            <Image source={pencilIcon} style={styles.pencilIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.thoughtControllers}>
                    <TouchableOpacity onPress={toggleActiveStatus}>
                        <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteFunc}>
                        <Image source={trasIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default YourActiveThought;
