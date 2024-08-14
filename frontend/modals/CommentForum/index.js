import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import Comment from "../../components/Comment";
import createOneComment from "../../data/createOneComment";
import { getNearbyComments } from "../../slices/getNearbyComments";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import replyOnComment from "../../data/replyOnComment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sendArrow from "../../assets/sendArrow.png";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

const CommentForum = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount } = route.params;
    const [inputHeight, setInputHeight] = useState("auto");
    const [localCommentCount, setLocalCommentCount] = useState(commentCount);
    const [content, setContent] = useState("");
    const [parent, setParent] = useState(thought);
    const inputRef = useRef(null)

    const { nearbyComments, loading } = useSelector((state) => state.getNearbyCommentsSlice);

    const commentOnThought = async () => {
        setContent("");
        setCommentCount(localCommentCount + 1);
        setLocalCommentCount(localCommentCount + 1);
        await createOneComment(thought, content);
        dispatch(getNearbyComments(thought));
    };

    const replyToComment = async () => {
        setContent("");
        await replyOnComment(parent, content);
        setCommentCount(localCommentCount + 1);
        setLocalCommentCount(localCommentCount + 1);
    };

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
            dispatch(getNearbyComments(thought));
            return () => {
                clearOpenReplySectionState();
            };
        }, [])
    );

    const renderComment = ({ item }) => (
        <Comment comment={item} setParent={setParent} inputRef={inputRef} />
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                {loading == "succeeded" ? (
                    <FlatList
                        data={nearbyComments}
                        renderItem={renderComment}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        ListHeaderComponent={
                            <>
                                <ThoughtForumThought thought={thought} liked={liked} likeCount={likeCount} handleDislike={handleDislike} handleLike={handleLike} commentCount={localCommentCount} setParent={setParent} />
                                <Text style={{ color: "white", paddingTop: 16, paddingLeft: 16, fontSize: 18 }}>Comments</Text>
                            </>
                        }
                        contentContainerStyle={styles.commentsContainer}
                    />
                ) : (
                    <View style={styles.contentLoaderContainer}>
                        <ContentLoader
                            height={70}
                            speed={1}
                            backgroundColor={'#333'}
                            foregroundColor={'#999'}
                            viewBox="0 0 380 70"
                        >
                            <Circle cx="30" cy="30" r="30" />
                            <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                            <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                        </ContentLoader>
                    </View>
                )}
                {/*input*/}
                <View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
                        ref={inputRef}
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
                    <TouchableOpacity onPress={parent.__typename == "Thought" ? commentOnThought : replyToComment}>
                        <Image source={sendArrow} style={styles.sendArrow} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CommentForum;