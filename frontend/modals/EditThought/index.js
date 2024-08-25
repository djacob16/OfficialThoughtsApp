import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import editOneThought from "../../data/editOneThought";
import styles from "./styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Video from "react-native-video";
import formatDate from "../../data/formatDate";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/colors";
import x from "../../assets/xmark.png"
import { deleteOneOption, deleteAnswers } from "../../data/deleteOption";
import { createNewOption } from "../../data/createOption";

const EditThought = () => {
    const route = useRoute();
    const dispatch = useDispatch()
    const { activeThought, setAnswered } = route.params;
    const [saveStatus, setSaveStatus] = useState(false);
    const [content, setContent] = useState(activeThought.content);
    const [image, setImage] = useState(activeThought.photo ? activeThought.photo : null);
    const [active, setActive] = useState(activeThought.active);
    const [parked, setParked] = useState(activeThought.parked);
    const [anonymous, setAnonymous] = useState(activeThought.anonymous);
    const [optionsArray, setOptionsArray] = useState([])
    const navigation = useNavigation();
    const [userHash, setUserHash] = useState("")
    const [loading, setLoading] = useState(false)

    const checkSaveStatus = (array) => {
        for (option of array) {
            if (option.length > 0) {
                setSaveStatus(true)
            } else {
                setSaveStatus(false);
                break;
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            const hash = await AsyncStorage.getItem("@hash");
            setUserHash(hash)
            const newOptionsArray = [];
            for (const option of activeThought?.options?.items || []) {
                newOptionsArray.push(option.content);
            }
            setOptionsArray(newOptionsArray);
            checkSaveStatus(newOptionsArray)
        }
        init()
    }, [])

    const editOption = (text, index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray[index] = text;
        setOptionsArray(tempOptionsArray)
        checkSaveStatus(tempOptionsArray)
    }

    const addOption = () => {
        const tempOptionsArray = [...optionsArray, ""]
        setOptionsArray(tempOptionsArray)
        checkSaveStatus(tempOptionsArray)
    }

    const removeOption = (index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray.splice(index, 1);
        setOptionsArray(tempOptionsArray)
        checkSaveStatus(tempOptionsArray)
    }

    const save = async () => {
        try {
            setLoading(true);

            if (activeThought.poll) {
                // Update parent comment
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

            // Dispatch actions
            await Promise.all([
                dispatch(getActiveThoughts()),
                dispatch(getNearbyThoughts(userHash))
            ]);
        } catch (error) {
            console.log("Error saving thought:", error);
        } finally {
            setLoading(false);
            setAnswered(false)
            navigation.navigate("Main");
        }
    };



    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
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
                                {activeThought.photo?.slice(-4) === ".jpg" &&
                                    <Image source={{ uri: activeThought.photo }} style={styles.photo} />
                                }
                                {activeThought.photo?.slice(-4) === ".mp4" &&
                                    <Video source={{ uri: activeThought.photo }} resizeMode="contain" controls={true} style={styles.video} />
                                }
                            </View>
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
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={saveStatus ? styles.saveButton : styles.invalidSaveButton} onPress={saveStatus ? save : () => { }}>
                        <Text style={saveStatus ? styles.saveText : styles.invalidSaveText}>{loading ? "Saving..." : "Save"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditThought;
