import React, { useState, useEffect } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from "react-native"
import { Colors } from "../../constants/colors";
import x from "../../assets/xmark.png"
import postThought from "../../data/postOneThought";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import yellowPin from "../../assets/mappinParked.png"
import whitePin from "../../assets/mappin.png"
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import { createNewOption } from "../../data/createOption";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { getActiveThoughts } from "../../slices/getActiveThoughts";

const Poll = () => {
    const [optionsArray, setOptionsArray] = useState(["", ""]);
    const [content, setContent] = useState("")
    const [post, setPost] = useState(false)
    const [parked, setParked] = useState(false)
    const [anonymous, setAnonymous] = useState(false)
    const [userHash, setUserHash] = useState("")
    const user = useSelector((state) => state.userSlice.user);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const init = async () => {
            const hash = await AsyncStorage.getItem("@hash")
            setUserHash(hash)
        }
        init()
    }, [])

    const checkPost = (array) => {
        for (option of array) {
            if (option.trim().length > 0) {
                setPost(true)
            } else {
                setPost(false);
                break;
            }
        }
    }

    const addOption = () => {
        const tempOptionsArray = [...optionsArray, ""]
        setOptionsArray(tempOptionsArray)
        checkPost(tempOptionsArray)
    }

    const editOption = (text, index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray[index] = text;
        setOptionsArray(tempOptionsArray)
        checkPost(tempOptionsArray)
    }

    const removeOption = (index) => {
        let tempOptionsArray = [...optionsArray];
        tempOptionsArray.splice(index, 1);
        setOptionsArray(tempOptionsArray)
        checkPost(tempOptionsArray)
    }

    const onPost = async () => {
        setLoading(true)
        const post = await postThought(content, true, parked, userHash, anonymous, user, "", true)
        const postId = post.id
        for (option of optionsArray) {
            const newOption = await createNewOption(option, postId)
        }
        setContent("")
        setOptionsArray(["", ""])
        setAnonymous(false)
        setParked(false)
        setPost(false)
        dispatch(getNearbyThoughts(userHash))
        dispatch(getActiveThoughts())
        setLoading(false)
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 10 }}>
            <ScrollView>
                <View style={styles.thoughtContainer}>
                    <View style={styles.profileContainer}>
                        {user?.photo && !anonymous ? (
                            <Image source={{ uri: user.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                        ) : (
                            <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                        )}
                    </View>
                    <View style={styles.thoughtBody}>
                        <View style={styles.userInfo}>
                            <View>
                                {user?.displayName && !anonymous ? (
                                    <Text style={styles.userName}>{user.displayName}</Text>
                                ) : (
                                    <Text style={styles.userName}>Anonymous</Text>
                                )}
                            </View>
                            <TouchableOpacity onPress={() => setParked(!parked)} style={{ paddingHorizontal: 5 }}>
                                <Image source={parked ? yellowPin : whitePin} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            multiline
                            style={styles.inputQuestion}
                            placeholder="What's on your mind..."
                            placeholderTextColor={"#ffffffa6"}
                            value={content}
                            onChangeText={setContent}
                            autoFocus={true} />
                        <View style={{ marginBottom: 20, gap: 10 }}>
                            {optionsArray.map((option, index) => (
                                <View key={index} style={styles.inputContainer}>
                                    <TextInput
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChangeText={(text) => editOption(text, index)}
                                        style={styles.input}
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
                            <TouchableOpacity style={styles.anonymousContainer} onPress={() => setAnonymous(!anonymous)} >
                                <Text style={anonymous ? styles.anonymous : styles.notAnonymous}>Anonymous</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.postContainer}>
                <TouchableOpacity style={post ? styles.postButton : styles.invalidPostButton} onPress={post ? onPost : () => { }}>
                    <Text style={post ? styles.postText : styles.invalidPostText}>{loading ? "Posting..." : "Post"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Poll;