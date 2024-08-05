import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import commentIcon from "../../assets/message.png";
import { likeComment, checkLiked } from "../../data/likeComment";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import Replies from "../Replies";
import { useDispatch } from "react-redux";
import { getNearbyReplies } from "../../slices/getNearbyReplies";

const Comment = ({ comment, setParent }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [openReplySection, setOpenReplySection] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const init = async () => {
            setLikeCount(comment.likes);
            const isLiked = await checkLiked(comment);
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        init()
    }, []);

    const handleLike = () => {
        setLiked(true)
        setLikeCount(likeCount + 1)
        likeComment(comment, true)
    }

    const handleDislike = () => {
        setLiked(false)
        setLikeCount(likeCount - 1)
        likeComment(comment, false)
    }

    const replyOnComment = () => {
        setParent(comment)
    }

    const showReplies = () => {
        setOpenReplySection(!openReplySection)
    }

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
                        onPress={liked ? () => handleDislike() : () => handleLike()}
                    >
                        {liked ? (
                            <Image
                                source={heartFillIcon}
                                style={styles.icon}
                            />
                        ) : (
                            <Image
                                source={heartIcon}
                                style={styles.icon}
                            />
                        )}
                        <Text style={styles.number}>
                            {likeCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionNumber} onPress={showReplies}>
                        <Image source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={replyOnComment}>
                        <Text style={{ color: "white" }}>reply</Text>
                    </TouchableOpacity>
                </View>
                {openReplySection && <Replies parentComment={comment} />}
            </View>
        </View>
    )
}

export default Comment;