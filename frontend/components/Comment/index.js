import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import commentIcon from "../../assets/message.png";
import { likeComment, checkLiked } from "../../data/likeComment";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import Replies from "../Replies";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Comment = ({ comment, setParent, inputRef }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [replyCount, setReplyCount] = useState();
    const [openReplySection, setOpenReplySection] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            setLikeCount(comment.likes);
            setReplyCount(comment.replies.items.length);
            const isLiked = await checkLiked(comment);
            setLiked(isLiked);

            // Check AsyncStorage for openReplySection state
            const savedState = await AsyncStorage.getItem(`openReplySection-${comment.id}`);
            if (savedState === 'true') {
                setOpenReplySection(true);
            }
        };
        init();
    }, [comment]);

    const handleLike = () => {
        setLiked(true);
        setLikeCount(likeCount + 1);
        likeComment(comment, true);
    };

    const handleDislike = () => {
        setLiked(false);
        setLikeCount(likeCount - 1);
        likeComment(comment, false);
    };

    const replyOnComment = () => {
        setParent(comment);
        inputRef.current?.focus();
        setOpenReplySection(true)
    };

    const showReplies = () => {
        const newState = !openReplySection;
        setOpenReplySection(newState);
        // Save the openReplySection state to AsyncStorage
        AsyncStorage.setItem(`openReplySection-${comment.id}`, JSON.stringify(newState));
    };

    return (
        <View style={styles.commentContainer}>
            <View style={styles.profileContainer}>
                {comment.author.photo ? (
                    <Image source={{ uri: comment.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View>
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
                </View>
                <View style={styles.thoughtInteractions}>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={liked ? handleDislike : handleLike}
                    >
                        <Image
                            source={liked ? heartFillIcon : heartIcon}
                            style={styles.icon}
                        />
                        <Text style={styles.number}>
                            {likeCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionNumber} onPress={showReplies}>
                        <Image source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>{replyCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={replyOnComment}>
                        <Text style={{ color: "white" }}>reply</Text>
                    </TouchableOpacity>
                </View>
                {openReplySection && <Replies parentComment={comment} setReplyCount={setReplyCount} setOpenReplySection={setOpenReplySection} />}
                {replyCount === 0 && openReplySection && <Text style={styles.subText}>no replies</Text>}
            </View>
        </View>
    );
};

export default Comment;
