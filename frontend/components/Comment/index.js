import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import commentIcon from "../../assets/message.png";
import { likeComment, checkLiked } from "../../data/likeComment";


const Comment = ({ comment }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

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
    }, [comment]);

    const handleLike = () => {
        setLiked(true)
        setLikeCount(likeCount + 1)
        likeComment(comment, true)
        console.log(comment)
    }

    const handleDislike = () => {
        setLiked(false)
        setLikeCount(likeCount - 1)
        likeComment(comment, false)
    }

    return (
        <View style={styles.commentContainer}>
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
                <TouchableOpacity style={styles.interactionNumber}>
                    <Image source={commentIcon} style={styles.icon} />
                    <Text style={styles.number}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>view replies</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Comment;