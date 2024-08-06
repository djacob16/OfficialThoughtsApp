import { View, Text, Image, TouchableOpacity } from "react-native";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import styles from "./styles";
import { useEffect, useState } from "react";
import { likeReply, checkLiked } from "../../data/likeReply";

const Reply = ({ reply }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        const init = async () => {
            setLikeCount(reply.likes);
            const isLiked = await checkLiked(reply);
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        init()
    }, [reply])

    const handleLike = () => {
        setLiked(true);
        setLikeCount(likeCount + 1);
        likeReply(reply, true);
    }

    const handleDislike = () => {
        setLiked(false);
        setLikeCount(likeCount - 1);
        likeReply(reply, false)
    }

    return (
        <View style={styles.replyContainer}>
            <View style={styles.profileContainer}>
                {reply.author.photo ? (
                    <Image source={{ uri: reply.author.photo }} style={{ width: 20, height: 20, borderRadius: 20 }} />
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 20, height: 20, borderRadius: 20 }} />
                )}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <View style={styles.replyBody}>
                    <View style={styles.userInfo}>
                        {reply.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{reply?.author?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(reply.createdAt)}</Text>
                    </View>
                    <View style={styles.replyContent}>
                        <Text style={styles.content}>{reply.content}</Text>
                    </View>
                </View>
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
            </View>
        </View>
    )
}

export default Reply;