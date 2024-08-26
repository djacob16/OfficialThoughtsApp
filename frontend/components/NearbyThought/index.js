import React, { useEffect, useState, useRef } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../data/formatDate";
import FastImage from "react-native-fast-image";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png";
import parkedIcon from "../../assets/mappinParked.png";
import heartFillIcon from "../../assets/heart.fill.png";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useNavigation } from "@react-navigation/native";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import Video from "react-native-video";
import xmark from "../../assets/xmark.png"
import { getDistance } from 'geolib';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { vote, checkAnswered } from "../../data/voteOnPoll";
import mute from "../../assets/speaker.slash.fill.png";
import unmute from "../../assets/speaker.wave.2.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { Audio } from 'expo-av';
import { Colors } from "../../constants/colors";
import DancingBars from "../DancingBars";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";

const NearbyThought = ({ thought }) => {
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [localVoteCount, setLocalVoteCount] = useState(0)
    const [answeredOption, setAnsweredOption] = useState("");
    const [commentCount, setCommentCount] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [userHash, setUserHash] = useState('');
    const navigation = useNavigation();
    const [track, setTrack] = useState(null)
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const [loadingSong, setLoadingSong] = useState(false)

    useEffect(() => {
        const init = async () => {
            setCommentCount(thought.totalReplies)
            setLikeCount(thought.likes);
            const isLiked = await checkLiked(thought);
            setLiked(isLiked);
            setUserHash(await AsyncStorage.getItem('@hash'))
            const answerId = await checkAnswered(thought);
            if (answerId) {
                for (option of thought.options.items) {
                    if (option.id == answerId) {
                        setLocalVoteCount(option.votes)
                    }
                }
                setAnsweredOption(answerId)
                setAnswered(true)
            }
        };
        init();

        if (thought.photo?.slice(-4) === ".jpg" || thought.photo?.slice(-4) === ".png") {
            FastImage.preload([{ uri: thought.photo }]);
        }
    }, [thought]);

    useEffect(() => {
        getSong()
    }, [])

    const getSong = async () => {
        const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
        console.log(spotifyAuth)
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
            if (thought.music) {
                try {
                    const response = await fetch(`https://api.spotify.com/v1/tracks/${thought.music}`, {
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

    const openImage = () => {
        setModalVisible(true);
    };

    const closeImage = () => {
        setModalVisible(false);
    };

    const onVote = async (option, thought) => {
        await vote(thought, option);
        setAnsweredOption(option.id)
        setLocalVoteCount(option.votes + 1)
        setAnswered(true)
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("CommentForum", {
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
                track
            })}
        >
            <View style={styles.profileContainer}>
                {!thought?.anonymous ? (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: thought.author.id })}>
                        <FastImage source={{ uri: thought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    </TouchableOpacity>
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View style={styles.midSectionContainer}>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {thought?.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: thought.author.id })}>
                                <Text style={styles.userName}>{thought?.author?.displayName}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.time}>{formatDate(thought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        {thought.content && <Text style={styles.content}>{thought.content}</Text>}
                        {thought?.photo?.length > 0 && (
                            <>
                                {(thought.photo.slice(-4) === ".jpg" || thought.photo?.slice(-4) === ".png") && (
                                    <View style={styles.mediaContainer}>
                                        {imageLoading && <ActivityIndicator style={styles.loader} />}
                                        <TouchableOpacity onPress={openImage}>
                                            <FastImage
                                                source={{ uri: thought.photo }}
                                                style={[styles.photo, imageLoading && styles.hiddenImage]}
                                                onLoadStart={() => setImageLoading(true)}
                                                onLoadEnd={() => setImageLoading(false)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {thought.photo.slice(-4) === ".mp4" && (
                                    <Video
                                        source={{ uri: thought.photo }}
                                        resizeMode="contain"
                                        controls={true}
                                        style={styles.video}
                                        onError={(error) => console.log('Video Error:', error)}
                                        onLoadStart={() => console.log('Video Loading Started')}
                                        onBuffer={() => console.log('Video Buffering')}
                                    />
                                )}
                            </>
                        )}
                        {spotifyAuth ? (
                            <>
                                {thought?.music && track &&
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
                                                <View style={styles.playButtonContainer}>
                                                    <Image source={spotifyLogo} style={{ width: 25, height: 25, opacity: 0.5 }} />
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
                        ) : (
                            <>
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
                            </>
                        )}

                        {thought.poll && (
                            <View style={styles.optionsContainer}>
                                {thought.options.items.map((option, index) => (
                                    <TouchableOpacity key={index} style={answeredOption == option.id ? styles.optionContainerHighlighted : styles.optionContainer} onPress={answered ? () => { } : () => onVote(option, thought)}>
                                        <Text style={styles.optionText}>{option.content}</Text>
                                        {answered && <Text style={styles.optionText}>{answeredOption == option.id ? localVoteCount : option.votes}</Text>}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.thoughtInteractions}>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={liked ? () => handleDislike(thought) : () => handleLike(thought)}
                    >
                        <FastImage source={liked ? heartFillIcon : heartIcon} style={styles.icon} />
                        <Text style={styles.number}>{likeCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={() => navigation.navigate("CommentForum", {
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
                            track
                        })}
                    >
                        <FastImage source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>{commentCount}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <FastImage source={shareIcon} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage source={threeDots} style={styles.threeDotsIcon} />
                    </TouchableOpacity> */}
                    <View style={styles.parkedDistance}>
                        {/* <Text style={styles.parkedText}>{thought.geohash}</Text> */}
                    </View>
                </View>
            </View>
            <View style={styles.parkedDistanceContainer}>
                {thought.parked && (
                    <View style={styles.parkedDistance}>
                        <FastImage style={styles.parkedIcon} source={parkedIcon} />
                        <Text style={styles.parkedText}>15</Text>
                    </View>
                )}
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            // onRequestClose={closeImage}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={closeImage} style={styles.closeButton}>
                        <Image style={styles.closeButton} source={xmark} />
                    </TouchableOpacity>
                    <FastImage source={{ uri: thought.photo }} style={styles.fullScreenImage} resizeMode="contain" />
                </View>
            </Modal>
        </TouchableOpacity >
    );
};

export default NearbyThought;
