import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import Comment from "../../components/Comment";
import createOneComment from "../../data/createOneComment";
import { getNearbyComments } from "../../slices/getNearbyComments";
import { useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native";
import replyOnComment from "../../data/replyOnComment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sendArrow from "../../assets/sendArrow.png"

const CommentForum = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount } = route.params;
    const [inputHeight, setInputHeight] = useState("auto");
    const [localCommentCount, setLocalCommentCount] = useState(commentCount);
    const [content, setContent] = useState("");
    const [parent, setParent] = useState(thought)

    const { nearbyComments } = useSelector((state) => state.getNearbyCommentsSlice);

    const commentOnThought = async () => {
        setContent("");
        setCommentCount(localCommentCount + 1);
        setLocalCommentCount(localCommentCount + 1)
        await createOneComment(thought, content);
        dispatch(getNearbyComments(thought))
    }

    const replyToComment = async () => {
        setContent("");
        await replyOnComment(parent, content);
        setCommentCount(localCommentCount + 1);
        setLocalCommentCount(localCommentCount + 1)
    }

    const clearOpenReplySectionState = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const openReplyKeys = keys.filter(key => key.startsWith('openReplySection-'));
            await AsyncStorage.multiRemove(openReplyKeys);
        } catch (error) {
            console.error("Error clearing open reply section state:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getNearbyComments(thought))
            return () => {
                clearOpenReplySectionState();
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                <ScrollView>
                    {/*parent thought*/}
                    <ThoughtForumThought thought={thought} liked={liked} likeCount={likeCount} handleDislike={handleDislike} handleLike={handleLike} commentCount={localCommentCount} setParent={setParent} />

                    {/*comments*/}
                    <Text style={{ color: "white", paddingTop: 16, paddingLeft: 16, fontSize: 18 }}>Comments</Text>
                    <View style={styles.commentsContainer}>
                        {nearbyComments.map((comment, index) => (
                            <Comment key={index} comment={comment} setParent={setParent} />
                        ))}
                    </View>
                </ScrollView>

                {/*input*/}
                <View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
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
                    {parent.__typename == "Thought" ? (
                        <TouchableOpacity onPress={commentOnThought}>
                            <Image source={sendArrow} style={styles.sendArrow} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={replyToComment}>
                            <Image source={sendArrow} style={styles.sendArrow} />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default CommentForum;

