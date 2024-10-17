import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, Keyboard, Animated, TouchableWithoutFeedback } from 'react-native';
import editOneThought from "../../data/editOneThought";
import styles from "./styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Video from "react-native-video";
import formatDate from "../../data/formatDate";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import { getInactiveThoughts } from "../../slices/getInactiveThoughts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/colors";
import x from "../../assets/xmark.png"
import { deleteOneOption, deleteAnswers } from "../../data/deleteOption";
import { createNewOption } from "../../data/createOption";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import DancingBars from "../../components/DancingBars";
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";

const EditThought = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const { activeThought } = route.params;
    const [saveStatus, setSaveStatus] = useState(false);
    const oldContent = activeThought?.content;
    const [content, setContent] = useState(activeThought?.content);
    const [image, setImage] = useState(activeThought.photo ? activeThought.photo : null);
    const [active, setActive] = useState(activeThought.active);
    const [parked, setParked] = useState(activeThought.parked);
    const [anonymous, setAnonymous] = useState(activeThought.anonymous);
    const [optionsArray, setOptionsArray] = useState([]);
    const [oldOptionsArray, setOldOptionsArray] = useState([]);
    const navigation = useNavigation();
    const [userHash, setUserHash] = useState("");
    const [loading, setLoading] = useState(false);
    const [spotifyAuth, setSpotifyAuth] = useState(true);
    const [loadingSong, setLoadingSong] = useState(false);
    const [track, setTrack] = useState(null);
    const keyboardHeight = useKeyboardHeight();

    const checkSaveStatus = (newOptionsArray) => {
        // Check for empty options
        const hasEmptyOption = newOptionsArray.some(option => option.trim().length === 0);
        if (hasEmptyOption) {
            setSaveStatus(false);
            return;
        }

        // Check for differences in length and values
        const oldLength = oldOptionsArray.length;
        const newLength = newOptionsArray.length;

        // Condition 1: Set true if any option now is different than what it was
        const hasDifferentOption = newOptionsArray.some((option, index) => {
            return index < oldLength && oldOptionsArray[index].trim() !== option.trim();
        });

        // Condition 2: Set true if there are more options than there were
        const hasMoreOptions = newLength > oldLength;

        // Set save status based on the conditions
        if (hasDifferentOption || hasMoreOptions) {
            setSaveStatus(true);
        } else {
            setSaveStatus(false);
        }
    };

    useEffect(() => {
        setSaveStatus(oldContent.trim() != content.trim())
    }, [content])

    const getSong = async () => {
        const spotifyAuth = await AsyncStorage.getItem("spotifyAuth");
        if (spotifyAuth && spotifyAuth == "true") {
            setSpotifyAuth(true);
            setLoadingSong(true);
            const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
            const expiryTime = new Date(expiryString);
            const currentTime = new Date();
            if (currentTime >= expiryTime) {
                await refreshAccessToken()
                console.log("NEW access token has been updated")
            }
            const accessToken = await AsyncStorage.getItem("spotifyAccessToken")
            if (activeThought?.music) {
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

    useEffect(() => {
        const init = async () => {
            const hash = await AsyncStorage.getItem("@hash");
            setUserHash(hash);
            getSong();
            const newOptionsArray = [];
            for (const option of activeThought?.options?.items || []) {
                oldOptionsArray.push(option.content);
                newOptionsArray.push(option.content);
            }
            setOptionsArray(newOptionsArray);
            checkSaveStatus(newOptionsArray);
        }
        init();
    }, [])

    const editOption = (text, index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray[index] = text;
        setOptionsArray(tempOptionsArray);
        checkSaveStatus(tempOptionsArray);
    }

    const addOption = () => {
        const tempOptionsArray = [...optionsArray, ""]
        setOptionsArray(tempOptionsArray);
        checkSaveStatus(tempOptionsArray);
    }

    const removeOption = (index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray.splice(index, 1);
        setOptionsArray(tempOptionsArray);
        checkSaveStatus(tempOptionsArray);
    }

    const save = async () => {
        try {
            setLoading(true);

            if (activeThought.poll) {
                // Update parent thought
                await editOneThought(activeThought.id, content, active, parked, anonymous);

                // Delete all current options
                await Promise.all(
                    (activeThought?.options?.items || []).map(option => deleteOneOption(option.id))
                );

                // Delete all answers
                await deleteAnswers(activeThought.id);

                // Make new options
                await Promise.all(
                    optionsArray
                        .filter(option => option.trim()) // Ensure no empty or whitespace-only options
                        .map(option => createNewOption(option, activeThought.id))
                );
            } else {
                // Update thought if it's not a poll
                await editOneThought(activeThought.id, content, active, parked, anonymous);
            }
        } catch (error) {
            console.log("Error saving thought:", error);
        } finally {
            await Promise.all([
                dispatch(getActiveThoughts()),
                dispatch(getInactiveThoughts()),
                dispatch(getNearbyThoughts(userHash))
            ]);
            setLoading(false);
            navigation.navigate("Main");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancelText}>cancel</Text></TouchableOpacity>
                        <Text style={styles.headerText}>Edit thought</Text>
                        <Text>        </Text>
                    </View>
                    <ScrollView style={styles.bodyContainer}>
                        <View style={styles.editContainer}>
                            <View style={styles.profileContainer}>
                                {activeThought?.author?.photo ? (
                                    <Image source={{ uri: activeThought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                                ) : (
                                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                                )}
                            </View>
                            <View style={styles.thoughtBody}>
                                <View style={styles.userInfo}>
                                    {activeThought.anonymous ? (
                                        <Text style={styles.userName}>Anonymous</Text>
                                    ) : (
                                        <Text style={styles.userName}>{activeThought?.author?.displayName}</Text>
                                    )}
                                    <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                                </View>
                                <View style={styles.thoughtContent}>
                                    <TextInput
                                        value={content}
                                        style={styles.input}
                                        onChangeText={setContent}
                                        multiline={true}
                                        autoFocus={true}
                                    />
                                    {activeThought?.photo?.slice(-4) === ".jpg" &&
                                        <Image source={{ uri: activeThought.photo }} style={styles.photo} />
                                    }
                                    {activeThought.photo?.slice(-4) === ".mp4" &&
                                        <Video source={{ uri: activeThought.photo }} resizeMode="contain" controls={true} style={styles.video} muted={true} />
                                    }
                                </View>
                                {activeThought?.poll &&
                                    <>
                                        <View style={{ marginBottom: 20, gap: 10 }}>
                                            {optionsArray.map((option, index) => (
                                                <View key={index} style={styles.inputContainer}>
                                                    <TextInput
                                                        placeholder={`Option ${index + 1}`}
                                                        value={option}
                                                        onChangeText={(text) => editOption(text, index)}
                                                        style={styles.inputOption}
                                                        placeholderTextColor={Colors.grayFont}
                                                    ></TextInput>
                                                    <TouchableOpacity onPress={optionsArray.length > 2 ? () => removeOption(index) : () => navigation.goBack()}>
                                                        <Image source={x} style={{ width: 20, height: 20 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            {optionsArray.length < 5 &&
                                                <TouchableOpacity style={styles.addOptionsContainer} onPress={addOption}>
                                                    <Text style={styles.addOptionText}>Add option</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </>
                                }
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
                            </View>
                        </View>
                    </ScrollView>
                </>
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.saveButtonContainer, { bottom: keyboardHeight }]}>
                <TouchableOpacity style={saveStatus ? styles.saveButton : styles.invalidSaveButton} onPress={saveStatus ? save : () => { }}>
                    <Text style={saveStatus ? styles.saveText : styles.invalidSaveText}>{loading ? "Saving..." : "Save"}</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default EditThought;
