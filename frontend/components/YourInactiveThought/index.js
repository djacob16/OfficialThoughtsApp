import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing, Alert } from 'react-native';
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png"
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFillinactive.png"
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import styles from "./styles";
import editOneThought from "../../data/editOneThought";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Video from "react-native-video";
import parkedIcon from "../../assets/mappinParked.png";
import Toast from "react-native-toast-message";
import { vote, checkAnswered } from "../../data/voteOnPoll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DancingBars from "../DancingBars";
import mute from "../../assets/speaker.slash.fill.png";
import unmute from "../../assets/speaker.wave.2.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { Colors } from "../../constants/colors";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import { getInactiveThoughts } from "../../slices/getInactiveThoughts";
import { Swipeable } from 'react-native-gesture-handler';
import SwipeActions from "../SwipeActions";
import threeDots from "../../assets/threeDots.png"

const YourInactiveThought = ({ inactiveThought }) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.userSlice.user);
    const [animatedValue] = useState(new Animated.Value(0));
    const [fullAnimatedValue] = useState(new Animated.Value(1));
    const [answered, setAnswered] = useState(false);
    const [localVoteCount, setLocalVoteCount] = useState(0)
    const [answeredOption, setAnsweredOption] = useState("");
    const [userHash, setUserHash] = useState("")
    const dispatch = useDispatch()
    const [track, setTrack] = useState(null)
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const [loadingSong, setLoadingSong] = useState(false)

    useEffect(() => {
        const init = async () => {
            const answerId = await checkAnswered(inactiveThought);
            if (answerId) {
                for (option of inactiveThought.options.items) {
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
    }, [inactiveThought]);

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
            if (inactiveThought.music) {
                try {
                    const response = await fetch(`https://api.spotify.com/v1/tracks/${inactiveThought.music}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        setSpotifyAuth(false)
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

    const deleteFunc = () => {
        Alert.alert(
            "Delete Thought",
            "Are you sure you want to delete this thought?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const response = await deleteOneThought(activeThought.id);
                        if (response.status === "success") {
                            dispatch(getActiveThoughts());
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
                    },
                },
            ]
        );
    };

    const toggleActiveStatus = async () => {
        const newActiveStatus = !inactiveThought.active;
        await editOneThought(
            inactiveThought.id,
            inactiveThought.content,
            newActiveStatus,
            inactiveThought.parked,
            inactiveThought.anonymous
        )
        dispatch(getNearbyThoughts(userHash))
        dispatch(getActiveThoughts())
        dispatch(getInactiveThoughts())
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }, [inactiveThought]);

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

    const renderRightActions = (progress, dragX) => (
        <SwipeActions
            progress={progress}
            dragX={dragX}
            toggleActiveStatus={toggleActiveStatus}
            deleteFunc={deleteFunc}
        />
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Animated.View style={animatedStyle}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        {inactiveThought?.anonymous ? (
                            <Image source={defaultProfilePic} style={{ width: 35, height: 35, borderRadius: 20 }} />
                        ) : (
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: inactiveThought.author.id })}>
                                <Image source={{ uri: inactiveThought.author.photo }} style={{ width: 35, height: 35, borderRadius: 20 }} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.thoughtBody}>
                        <View style={styles.userInfo}>
                            {inactiveThought.anonymous ? (
                                <Text style={styles.userName}>Anonymous</Text>
                            ) : (
                                <Text style={styles.userName}>{user?.displayName}</Text>
                            )}
                            <Text style={styles.time}>{formatDate(inactiveThought.createdAt)}</Text>
                        </View>
                        <View style={styles.thoughtContent}>
                            {inactiveThought.content && <Text style={styles.content}>{inactiveThought.content}</Text>}
                            {(inactiveThought.photo?.slice(-4) === ".jpg" || inactiveThought.photo?.slice(-4) === ".png") && <Image source={{ uri: inactiveThought.photo }} style={styles.photo} />}
                            {inactiveThought.photo?.slice(-4) === ".mp4" && <Video source={{ uri: inactiveThought.photo }} resizeMode="contain" controls={true} style={styles.video} />}
                            {spotifyAuth ? (
                                <>
                                    {inactiveThought?.music && track &&
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
                            ) : inactiveThought.music ? (

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
                            {inactiveThought.poll && (
                                <View style={styles.optionsContainer}>
                                    {inactiveThought.options.items.map((option, index) => (
                                        <View key={index} style={answeredOption == option.id ? styles.optionContainerHighlighted : styles.optionContainer}>
                                            <Text style={styles.optionText}>{option.content}</Text>
                                            {answered && <Text style={styles.optionText}>{answeredOption == option.id ? localVoteCount : option.votes}</Text>}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                        {/* <View style={styles.thoughtTags}>
                        <Text style={styles.tags}>no tags yet</Text>
                        </View> */}
                        <View style={styles.thoughtInteractions}>
                            <View style={styles.interactionNumber}>
                                <Image source={heartIcon} style={styles.icon} />
                                <Text style={styles.number}>{inactiveThought.likes}</Text>
                            </View>
                            <View style={styles.interactionNumber}>
                                <Image source={commentIcon} style={styles.icon} />
                                <Text style={styles.number}>{inactiveThought.totalReplies}</Text>
                            </View>
                            {inactiveThought.parked &&
                                <View style={styles.parkedDistance}>
                                    <Image style={styles.parkedIcon} source={parkedIcon} />
                                    <Text style={styles.parkedText}>15</Text>
                                </View>
                            }
                        </View>
                    </View>
                    {/* <View style={styles.thoughtControllers}>
                        <TouchableOpacity onPress={toggleActiveStatus}>
                            <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteFunc}>
                            <Image source={trasIcon} style={styles.controllerIcons} />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </Animated.View>
        </Swipeable>
    )
}

export default YourInactiveThought;