import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import createOneComment from "../../data/createOneComment";
import sendArrow from "../../assets/sendArrow.png";
import { getNearbyComments } from "../../slices/getNearbyComments";
import { useDispatch, useSelector } from "react-redux"
import Comment from "../../components/Comment";
import { useFocusEffect } from "@react-navigation/native";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import replyOnComment from "../../data/replyOnComment";

const CommentForum = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount } = route.params;
    const [height, setHeight] = useState(40);
    const [comment, setComment] = useState("");
    const [inputHeight, setInputHeight] = useState("auto");
    const [localCommentCount, setLocalCommentCount] = useState(commentCount);
    const [openReply, setOpenReply] = useState(false);
    const [username, setUsername] = useState("");
    const [comments, setComments] = useState([]);

    const { nearbyComments, loading } = useSelector((state) => state.getNearbyCommentsSlice);


    const commentOnThought = async () => {
        console.log("comment on thought")
        setComment("");
        setCommentCount(localCommentCount + 1);
        setLocalCommentCount(localCommentCount + 1)
        await createOneComment(thought, comment);
        dispatch(getNearbyComments(thought))
    }

    const commentOnReply = async () => {
        await replyOnComment(comments, comment);
        console.log(comment);
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getNearbyComments(thought))
            setOpenReply(false);
            console.log('CommentForum modal is now visible');

            return () => {
                dispatch(getNearbyComments(thought))
                console.log('CommentForum modal has been closed');
            };
        }, [])
    );

    // useEffect(() => {
    //     dispatch(getNearbyComments(thought))
    // }, [])

    console.log(openReply);
    console.log(username);
    console.log("comments: ", comments);
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                <ScrollView>
                    {/*parent thought*/}
                    <ThoughtForumThought thought={thought} liked={liked} likeCount={likeCount} handleDislike={handleDislike} handleLike={handleLike} commentCount={localCommentCount} setOpenReply={setOpenReply} />

                    {/*comments*/}
                    <View style={styles.commentsContainer}>
                        {nearbyComments.map((comment, index) => (
                            <Comment setComments={setComments} key={index} comment={comment} setOpenReply={setOpenReply} setUsername={setUsername} />
                        ))}
                    </View>
                </ScrollView>

                {/*input*/}
                {openReply ? (<View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
                        style={[styles.input, { height: inputHeight, minHeight: 20 }]}
                        value={comment}
                        marginBottom={0}
                        keyboardAppearance="dark"
                        onChangeText={setComment}
                        placeholder={`@${username}`}
                        placeholderTextColor="#888"
                        multiline={true}
                        onContentSizeChange={(event) => {
                            const newHeight = event.nativeEvent.contentSize.height;
                            setInputHeight(newHeight > 100 ? 100 : newHeight); // Example max height of 100
                        }}
                    />
                    <TouchableOpacity onPress={commentOnReply}>
                        <Image source={sendArrow} style={styles.sendArrow} />
                    </TouchableOpacity>
                </View>) : (<View style={[styles.inputContainer, { height: inputHeight, minHeight: 60 }]}>
                    <TextInput
                        style={[styles.input, { height: inputHeight, minHeight: 20 }]}
                        value={comment}
                        marginBottom={0}
                        keyboardAppearance="dark"
                        onChangeText={setComment}
                        placeholder="Type a message.."
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
                </View>)}
            </KeyboardAvoidingView>
        </View >
    )
}

export default CommentForum;

