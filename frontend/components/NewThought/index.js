import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Linking } from "react-native";
import Video from "react-native-video"
import styles from './styles';
import camIcon from "../../assets/camera-01.png"
import picIcon from "../../assets/image-01.png"
import musicIcon from "../../assets/note-02.png"
import giphyIcon from "../../assets/gif.png"
import pollIcon from "../../assets/Frame 944.png"
import yellowPin from "../../assets/mappinParked.png"
import whitePin from "../../assets/mappin.png"
import activeBulb from "../../assets/lightbulbFill.png"
import inactiveBulb from "../../assets/lightbulbFillinactive.png"
import postOneThought from "../../data/postOneThought";
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { getOneUser } from "../../slices/getOneUser";
import { useDispatch, useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";
import { uploadThoughtMedia } from "../../data/uploadThoughtMedia";
import { uploadData } from 'aws-amplify/storage';
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import playIcon from "../../assets/play.circle.png";
import pauseIcon from "../../assets/pause.circle.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { Audio } from 'expo-av';
import { Colors } from "../../constants/colors";

const NewThought = ({ hash }) => {
    const client = generateClient();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("")
    const [active, setActive] = useState(true)
    const [parked, setParked] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [pickedImage, setPickedImage] = useState("");
    const [imgData, setImgData] = useState("");
    const [key, setKey] = useState("");
    const [uploadKey, setUploadKey] = useState("")
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const [track, setTrack] = useState("")
    const [playingTrackId, setPlayingTrackId] = useState(null);
    const [sound, setSound] = useState(null);

    const user = useSelector((state) => state.userSlice.user);

    const clearImage = () => {
        setPickedImage("");
        setImgData("");
        setKey("");
        setTrack(null)
    }

    const toS3 = async () => {
        const data = await uploadThoughtMedia("New thought");
        if (data) {
            if (data?.error) {
                Toast.show({
                    type: 'error',
                    text1: data.error,
                });
            } else {
                setPickedImage(data.mediaPath);
                setImgData(data.mediaData);
                setKey(data.key);
            }
        }
    }

    const postNewThought = async () => {
        const bucket = "thoughtsapp8fd738644ed04b61a716a9444c7fe4fb83473-staging";
        if (imgData && key) {
            setLoading(true)
            try {
                const result = await uploadData({
                    key: key,
                    data: imgData,
                    options: {
                        accessLevel: undefined
                    }
                }).result;
                let s3URL = `https://${bucket}.s3.us-east-2.amazonaws.com/public/${result.key}`;
                if (hash) {
                    const response = await postOneThought(content, active, parked, hash, anonymous, user, s3URL, false, "");
                    if (response.__typename == "Thought") {
                        setContent("");
                        setPickedImage("");
                        setUploadKey("");
                        s3URL = "";
                        setImgData("");
                        setKey("");
                        setActive(true);
                        setAnonymous(false);
                        setParked(false);
                        setTrack(null)
                        setLoading(false)
                        dispatch(getNearbyThoughts(hash))
                        Toast.show({
                            type: 'success',
                            text1: 'Thought posted successfully!',
                        });
                    } else {
                        setLoading(false)
                        Toast.show({
                            type: 'error',
                            text1: 'Error posting thought, please check your connection',
                        });
                    }
                }
            } catch (error) {
                console.log('Error : ', error);
            }
        } else {
            if ((content.trim().length > 0 && hash) || (track && hash)) {
                setLoading(true)
                const response = await postOneThought(content, active, parked, hash, anonymous, user, "", false, track.id);
                if (response.__typename == "Thought") {
                    setContent("");
                    setPickedImage("");
                    setUploadKey("");
                    setTrack(null)
                    setActive(true);
                    setAnonymous(false);
                    setParked(false);
                    setLoading(false)
                    dispatch(getNearbyThoughts(hash))
                    Toast.show({
                        type: 'success',
                        text1: 'Thought posted successfully!',
                    });
                } else {
                    setLoading(false)
                    Toast.show({
                        type: 'error',
                        text1: 'Error posting thought, please check your connection',
                    });
                }

            }
        }
        if (sound) {
            await sound.pauseAsync();
            await sound.unloadAsync();
            setPlayingTrackId(null);
        }
    }

    useEffect(() => {
        dispatch(getOneUser());
    }, [dispatch]);

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'back', })
        console.log("result: ", result);
    }

    const toNewThoughtModal = (type) => {
        navigation.navigate("NewThoughtModal", { type, setTrack })
    }

    const playPreview = async (previewUrl, trackId) => {
        try {
            if (sound) {
                await sound.unloadAsync();
                setPlayingTrackId(null);
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: previewUrl });
            setSound(newSound);
            setPlayingTrackId(trackId);
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    // Reset the play button state when the track finishes
                    setPlayingTrackId(null);
                }
            });
            await newSound.playAsync();
        } catch (error) {
            console.log("Error playing preview:", error);
        }
    };

    const pausePreview = async () => {
        if (sound) {
            await sound.pauseAsync();
            setPlayingTrackId(null);
        }
    };

    return (
        <View style={styles.container}>
            {loading &&
                <View style={styles.loadingContainer}>
                    <Text style={{ color: "white", fontSize: 15 }}>Posting thought</Text>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            }
            <View style={styles.inputTopContainer}>
                <Text style={styles.name}>Hey, {anonymous ? "anonymous" : user?.displayName}</Text>
                <TouchableOpacity style={styles.postButton} onPress={postNewThought}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="What's on your mind..."
                placeholderTextColor={"#ffffffa6"}
                value={content}
                onChangeText={setContent} />
            {(pickedImage.slice(-4) === ".jpg" || pickedImage.slice(-4) === ".png") &&
                <Image source={{ uri: pickedImage }} style={{ width: "100%", height: 250, marginBottom: 20, borderRadius: 10 }} />}
            {pickedImage.slice(-4) === ".mp4" && <Video source={{ uri: pickedImage }} resizeMode="contain" controls={true} style={styles.video} />}
            {track &&
                <View style={styles.trackContainer}>
                    <Image source={{ uri: track?.album?.images[0]?.url }} resizeMode="cover" style={{ width: 55, height: 55, borderRadius: 5 }} />
                    <View style={styles.trackInfoContainer}>
                        <Text style={styles.trackTitle}>{track.name}</Text>
                        <Text style={styles.artistTitle}>- {track.artists.map(artist => artist.name).join(', ')}</Text>
                    </View>
                    {track.preview_url ? (
                        <TouchableOpacity
                            onPress={() => {
                                if (playingTrackId === track.id) {
                                    pausePreview();
                                } else {
                                    playPreview(track.preview_url, track.id);
                                }
                            }}
                            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
                        >
                            <Image
                                source={playingTrackId === track.id ? pauseIcon : playIcon}
                                style={{ width: 44, height: 44 }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1 }} onPress={() => { Linking.openURL(item.external_urls.spotify) }}>
                            <Image source={spotifyLogo} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    )
                    }
                </View>
            }
            <View style={styles.inputBottomContainer}>
                <View style={styles.inputBottomLeftContainer}>
                    {!track && < TouchableOpacity onPress={() => toNewThoughtModal("camera")} >
                        <Image source={camIcon} style={styles.icon} />
                    </TouchableOpacity>}
                    {!track && <TouchableOpacity onPress={toS3}>
                        <Image source={picIcon} style={styles.icon} />
                    </TouchableOpacity>}
                    {!imgData && <TouchableOpacity onPress={() => toNewThoughtModal("music")}>
                        <Image source={musicIcon} style={styles.icon} />
                    </TouchableOpacity>}
                    {!track && !imgData && <TouchableOpacity onPress={() => toNewThoughtModal("gif")}>
                        <Image source={giphyIcon} style={styles.icon} />
                    </TouchableOpacity>}
                    {!track && !imgData && <TouchableOpacity onPress={() => toNewThoughtModal("poll")}>
                        <Image source={pollIcon} style={styles.icon} />
                    </TouchableOpacity>}
                </View>
                <View style={styles.inputBottomRightContainer}>
                    {(pickedImage || track) && <TouchableOpacity onPress={clearImage}>
                        <Text style={{ color: "white" }}>Clear</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => setParked(!parked)}>
                        <Image source={parked ? yellowPin : whitePin} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.anonymousContainer} onPress={() => setAnonymous(!anonymous)} >
                        <Text style={anonymous ? styles.anonymous : styles.notAnonymous}>Anonymous</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default NewThought;
