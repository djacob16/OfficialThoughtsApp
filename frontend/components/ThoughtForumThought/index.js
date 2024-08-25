import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Linking, Animated, Easing } from "react-native";
import Video from "react-native-video";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png"
import parkedIcon from "../../assets/mappinParked.png"
import heartFillIcon from "../../assets/heart.fill.png";
import formatDate from "../../data/formatDate";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useRoute } from "@react-navigation/native";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import { useNavigation } from "@react-navigation/native";
import { vote, checkAnswered } from "../../data/voteOnPoll";
import mute from "../../assets/speaker.slash.fill.png";
import unmute from "../../assets/speaker.wave.2.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { Audio } from 'expo-av';
import { Colors } from "../../constants/colors";
import DancingBars from "../../components/DancingBars";
import Svg, { Circle } from 'react-native-svg';
import * as Progress from 'react-native-progress';
import CircularProgress from "../circularProgress";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ThoughtForumThought = ({ thought,
    likeCount, liked, handleDislike,
    handleLike, commentCount, setParent,
    answered, setAnswered, localVoteCount,
    setLocalVoteCount, answeredOption, setAnsweredOption,
    togglePlayPause, isPlaying, track, progress }) => {

    const [localLiked, setLocalLiked] = useState(liked);
    const [localLikeCount, setlocalLikeCount] = useState(likeCount);
    const [imageLoading, setImageLoading] = useState(true);


    const [localAnswered, setLocalAnswered] = useState(answered);
    const [localLocalVoteCount, setLocalLocalVoteCount] = useState(localVoteCount)
    const [localAnsweredOption, setLocalAnsweredOption] = useState(answeredOption);

    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const [loadingSong, setLoadingSong] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        const init = async () => {
            const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
            if (spotifyAuth !== "true") {
                setSpotifyAuth(false)
            }
            setSpotifyAuth(true)
        };
        init();
        if (thought.photo?.slice(-4) === ".jpg") {
            FastImage.preload([{ uri: thought.photo }]);
        }
    }, [thought])

    const handleLocalLike = () => {
        setLocalLiked(!localLiked)
        setlocalLikeCount(localLikeCount + 1)
        handleLike(thought)
    }
    const handleLocalDislike = () => {
        setLocalLiked(!localLiked)
        setlocalLikeCount(localLikeCount - 1)
        handleDislike(thought)
    }

    const toProfile = (userId) => {
        navigation.goBack(); // Close the modal
        navigation.navigate('Profile', { userId });
    }

    const onVote = async (option, thought) => {
        await vote(thought, option);
        setAnsweredOption(option.id)
        setLocalAnsweredOption(option.id)
        setLocalVoteCount(option.votes + 1)
        setLocalLocalVoteCount(option.votes + 1)
        setAnswered(true)
        setLocalAnswered(true)
    }

    console.log(thought);
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {thought.author.photo && !thought.anonymous ? (
                    <TouchableOpacity onPress={() => toProfile(thought.author.id)}>
                        <Image source={{ uri: thought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    </TouchableOpacity>
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View style={styles.midSectionContainer}>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {thought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <TouchableOpacity onPress={() => toProfile(thought.author.id)}>
                                <Text style={styles.userName}>{thought?.author?.displayName}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.time}>{formatDate(thought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>{thought.content}</Text>
                        {thought.photo && (
                            <>
                                {thought.photo.slice(-4) === ".jpg" && (
                                    <View style={styles.mediaContainer}>
                                        {imageLoading && <ActivityIndicator style={styles.loader} />}
                                        <TouchableOpacity>
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
                                                    <TouchableOpacity onPress={togglePlayPause}>
                                                        <Progress.Circle
                                                            size={20}
                                                            progress={progress}
                                                            color={Colors.whiteFont}
                                                            unfilledColor={Colors.lightGray}
                                                            thickness={2.5}
                                                            borderWidth={0}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (
                                                <View style={styles.playButtonContainer}>
                                                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1, borderRadius: 50 }}>
                                                        <Image source={spotifyLogo} style={{ width: 25, height: 25, opacity: 0.5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>

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
                                    <TouchableOpacity key={index} style={localAnsweredOption == option.id ? styles.optionContainerHighlighted : styles.optionContainer} onPress={localAnswered ? () => { } : () => onVote(option, thought)}>
                                        <Text style={styles.optionText}>{option.content}</Text>
                                        {localAnswered && <Text style={styles.optionText}>{localAnsweredOption == option.id ? localLocalVoteCount : option.votes}</Text>}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.thoughtInteractions}>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={localLiked ? () => handleLocalDislike() : () => handleLocalLike()}
                    >
                        {localLiked ? (
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
                            {localLikeCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionNumber} onPress={() => setParent(thought)}>
                        <Image source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>{commentCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={shareIcon} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={threeDots} style={styles.threeDotsIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.parkedDistanceContainer}>
                {thought.parked && (
                    <View style={styles.parkedDistance}>
                        <Image style={styles.parkedIcon} source={parkedIcon} />
                        <Text style={styles.parkedText}>15</Text>
                    </View>
                )}
            </View>
        </View>
    )
}
export default ThoughtForumThought;
