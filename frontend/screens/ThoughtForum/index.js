import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, LayoutAnimation, UIManager, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import thumbIcon from "../../assets/thumbsUp.png"
import thumbIconFill from '../../assets/hand.thumbsup.fill.png';
import Toast from 'react-native-toast-message';
import ReplyComment from "../../components/ReplyComment";

const ThoughtForum = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { thought, userId, username } = route.params;
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState({});
    const [replyContents, setReplyContents] = useState({});

    // Enable LayoutAnimation on Android
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    const commentOnThought = async (thought) => {
        try {
            if (commentContent) {
                const comment = await axios.post(`http://localhost:4000/endpoints/comments/commentOnThought`, {
                    parentThoughtId: thought._id,
                    authorId: userId,
                    authorUsername: username,
                    content: commentContent,
                    likeCount: 0,
                });
                if (comment.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thought posted your comment!',
                    });
                    setCommentContent("");
                    getComments();
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to post your comment',
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const replyToComment = async (comment) => {
        if (replyContents[comment._id]) {
            try {
                const reply = await axios.post('http://localhost:4000/endpoints/comments/replyToComment', {
                    authorId: userId,
                    authorUsername: username,
                    parentCommentId: comment._id,
                    content: replyContents[comment._id],
                    likeCount: 0
                });
                if (reply.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Reply posted!',
                    });
                    handleReplyContentChange(comment._id, "");
                    setReplies((prevReplies) => ({
                        ...prevReplies,
                        [comment._id]: {
                            ...prevReplies[comment._id],
                            visible: true,
                            displayCount: 5,
                        },
                    }));
                    setComments((prevComments) =>
                        prevComments.map((c) =>
                            c._id === comment._id
                                ? { ...c, replies: [...c.replies, reply.data] }
                                : c
                        )
                    );
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to post your reply',
                    });
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const getComments = async () => {
        try {
            const fetchedComments = await axios.get(`http://localhost:4000/endpoints/comments/commentsOnThought/${thought._id}`);
            setComments(fetchedComments.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

    const toggleReplies = (commentId) => {
        // Configure the animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReplies((prevReplies) => ({
            ...prevReplies,
            [commentId]: {
                ...prevReplies[commentId],
                visible: !prevReplies[commentId]?.visible,
                displayCount: prevReplies[commentId]?.visible ? 0 : 5,
            },
        }));
    }


    const handleReplyContentChange = (commentId, text) => {
        setReplyContents((prevReplyContents) => ({
            ...prevReplyContents,
            [commentId]: text,
        }));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', marginLeft: 20, marginBottom: 30 }}>&lt;</Text>
            </TouchableOpacity>
            <View style={styles.thoughtContainer}>
                <Text style={styles.thoughtUsername}>{username}</Text>
                <Text style={styles.thoughtContent}>{thought.content}</Text>
            </View>
            <View style={styles.commentThoughtContainer}>
                <TextInput multiline={true} style={styles.commentInput} placeholder="Comment on this thought..." placeholderTextColor={"gray"} onChangeText={setCommentContent} value={commentContent} />
                <TouchableOpacity onPress={() => commentOnThought(thought)}>
                    <Text style={{ color: "yellow" }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.commentsContainer}
                data={comments}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={<Text style={styles.commentsTitle}>Comments</Text>}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.author}>{item.authorUsername}</Text>
                        <Text style={styles.comment}>{item.content}</Text>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <TouchableOpacity>
                                <Image source={thumbIcon} style={{ width: 16, height: 16, marginRight: 15 }} />
                            </TouchableOpacity>
                            <Text style={styles.likes}>{item.likeCount}</Text>
                            <TouchableOpacity style={styles.replyContainer} onPress={() => toggleReplies(item._id)}>
                                <Text style={styles.reply}>
                                    {replies[item._id]?.visible ? "Hide replies" : `See ${item.replies.length} replies`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {replies[item._id]?.visible && (
                            <View>
                                <TextInput
                                    multiline={true}
                                    value={replyContents[item._id] || ''}
                                    placeholder="Reply to this comment..."
                                    placeholderTextColor={"gray"}
                                    onChangeText={(text) => handleReplyContentChange(item._id, text)}
                                    style={{ color: "yellow", marginBottom: 10 }}
                                />
                                <TouchableOpacity onPress={() => replyToComment(item)}>
                                    <Text style={{ color: "yellow", marginBottom: 15 }}>Submit</Text>
                                </TouchableOpacity>
                                <ReplyComment parentComment={item} displayCount={replies[item._id]?.displayCount} />
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

export default ThoughtForum;

