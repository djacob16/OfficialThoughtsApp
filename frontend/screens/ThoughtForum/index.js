import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import styles from "./styles";
import BackArrow from "../../components/BackArrow";
import { useRoute } from "@react-navigation/native";
import { likeThought, checkLiked } from "../../data/likeThought";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import createOneComment from "../../data/createOneComment";
import sendArrow from "../../assets/sendArrow.png"

const ThoughtForum = () => {
    const route = useRoute()
    const { thought, likeCount } = route.params;
    // const [likeCount, setLikeCount] = useState(0);
    const [height, setHeight] = useState(40);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [inputHeight, setInputHeight] = useState("auto");

    // const init = async () => {
    //     setLikeCount(thought.likes);
    //     const isLiked = await checkLiked(thought);
    //     if (isLiked) {
    //         setLiked(true)
    //     }
    // }

    // useEffect(() => {
    //     init()
    // }, []);

    // const handleLike = (thought) => {
    //     setLiked(true)
    //     setLikeCount(likeCount + 1)
    //     likeThought(thought, true)
    // }

    // const handleDislike = (thought) => {
    //     setLiked(false)
    //     setLikeCount(likeCount - 1)
    //     likeThought(thought, false)
    // }

    const commentOnThought = async () => {
        await createOneComment(thought, comment);
        setComment("");
    }

    return (
        <View style={styles.container}>
            <BackArrow />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                <ScrollView>
                    <ThoughtForumThought thought={thought} likeCount={likeCount} />
                </ScrollView>

                <View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
                        style={[styles.input, { height: inputHeight, minHeight: 20 }]}
                        value={comment}
                        marginBottom={0}
                        keyboardAppearance="dark"
                        onChangeText={setComment}
                        placeholder="Type a message..."
                        placeholderTextColor="#888"
                        multiline={true}
                        onContentSizeChange={(event) => {
                            const newHeight = event.nativeEvent.contentSize.height;
                            setInputHeight(newHeight > 100 ? 100 : newHeight); // Example max height of 100
                        }}
                    />
                    <TouchableOpacity onPress={commentOnThought}>
                        <Image source={sendArrow} style={styles.sendArrow} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View >
    )
}

export default ThoughtForum;

