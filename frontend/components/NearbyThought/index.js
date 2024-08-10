import React, { useEffect, useState } from "react";
import styles from "./styles";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png"
import parkedIcon from "../../assets/mappinParked.png"
import heartFillIcon from "../../assets/heart.fill.png";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useNavigation } from "@react-navigation/native";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Video from "react-native-video"


const NearbyThought = ({ thought }) => {
    const { user } = useSelector((state) => state.userSlice);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const navigation = useNavigation();

    console.log("thought", thought.comments.items.length);
    console.log(thought.comments.items.length);

    const calcTotalComments = (thought) => {
        let total = 0;
        thought?.comments?.items.forEach((comment) => {
            if (comment) {
                total += 1;
            }
            comment?.replies?.items.forEach((reply) => {
                if (reply) {
                    total += 1;
                }
            });
        });
        return total;
    };

    const init = async () => {
        const totalComments = calcTotalComments(thought);
        setCommentCount(totalComments);
        setLikeCount(thought.likes);
        const isLiked = await checkLiked(thought);
        if (isLiked) {
            setLiked(true)
        }
    }

    useEffect(() => {
        init()
    }, []);

    const handleLike = (thought) => {
        setLiked(true)
        setLikeCount(likeCount + 1)
        likeThought(thought, true)
    }

    const handleDislike = (thought) => {
        setLiked(false)
        setLikeCount(likeCount - 1)
        likeThought(thought, false)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("CommentForum", { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount })}>
            <View style={styles.profileContainer}>
                {thought.author.photo ? (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: thought.author.id })}>
                        <Image source={{ uri: thought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    </TouchableOpacity>
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View style={styles.midSectionContainer}>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {thought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: thought.author.id })}>
                                <Text style={styles.userName}>{thought?.author?.displayName}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.time}>{formatDate(thought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>{thought.content}</Text>
                        <TouchableOpacity>
                            {thought.photo?.slice(-4) === ".jpg" && <Image source={{ uri: thought.photo }} style={styles.photo} />}
                            {thought.photo?.slice(-4) === ".mp4" && <Video source={{ uri: thought.photo }} resizeMode="contain" controls={true} style={{ width: "100%", height: 250, marginBottom: 20, borderRadius: 10, marginTop: 10 }} />}
                        </TouchableOpacity>
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
                        onPress={liked ? () => handleDislike(thought) : () => handleLike(thought)}
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
                    <TouchableOpacity style={styles.interactionNumber} onPress={() => navigation.navigate("CommentForum", { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount })}>
                        <Image source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>{commentCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={shareIcon} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={threeDots} style={styles.threeDotsIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.parkedDistanceContainer}>
                {thought.parked && (
                    <View style={styles.parkedDistance}>
                        <Image style={styles.parkedIcon} source={parkedIcon} />
                        <Text style={styles.parkedText}>15</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default NearbyThought;