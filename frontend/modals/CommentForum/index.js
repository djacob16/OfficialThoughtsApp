import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import styles from "./styles";
import BackArrow from "../../components/BackArrow";
import { useRoute } from "@react-navigation/native";
import { likeThought, checkLiked } from "../../data/likeThought";
import ThoughtForumThought from "../../components/ThoughtForumThought";
import createOneComment from "../../data/createOneComment";
import sendArrow from "../../assets/sendArrow.png";
import { getNearbyComments } from "../../slices/getNearbyComments";
import { useDispatch, useSelector } from "react-redux"
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";

const CommentForum = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const { thought } = route.params;
    const [likeCount, setLikeCount] = useState(0);
    const [height, setHeight] = useState(40);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [inputHeight, setInputHeight] = useState("auto");

    const { nearbyComments, loading } = useSelector((state) => state.getNearbyCommentsSlice);

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

    useEffect(() => {
        dispatch(getNearbyComments(thought))
    }, [dispatch])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                <ScrollView>
                    <ThoughtForumThought thought={thought} />
                    <View style={styles.commentsContainer}>
                        {nearbyComments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <View style={styles.profileContainer}></View>
                                <View style={styles.thoughtBody}>
                                    <View style={styles.userInfo}>
                                        {comment.anonymous ? (
                                            <Text style={styles.userName}>Anonymous</Text>
                                        ) : (
                                            <Text style={styles.userName}>{comment?.author?.displayName}</Text>
                                        )}
                                        <Text style={styles.time}>{formatDate(comment.createdAt)}</Text>
                                    </View>
                                    <View style={styles.thoughtContent}>
                                        <Text style={styles.content}>{comment.content}</Text>
                                    </View>
                                    {/* <View style={styles.thoughtTags}>
                                            <Text style={styles.tags}>Be the first to leave a label</Text>
                                            <TouchableOpacity style={styles.addButton}>
                                                <Text style={styles.addText}>+</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                </View>
                                <View style={styles.thoughtInteractions}>
                                    <TouchableOpacity style={styles.interactionNumber}>
                                        <Image
                                            source={heartIcon}
                                            style={styles.icon}
                                        />
                                        <Text style={styles.number}>{comment.likes}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.interactionNumber}>
                                        <Image source={commentIcon} style={styles.icon} />
                                        <Text style={styles.number}>2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text>view replies</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
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

export default CommentForum;

