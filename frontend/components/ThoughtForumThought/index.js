import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png"
import parkedIcon from "../../assets/mappinParked.png"
import heartFillIcon from "../../assets/heart.fill.png";
import formatDate from "../../data/formatDate";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useRoute } from "@react-navigation/native";
import defaultProfilePic from "../../assets/defaultprofilepic.png"

const ThoughtForumThought = ({ thought, likeCount, liked, handleDislike, handleLike, commentCount, setParent }) => {
    const [localLiked, setLocalLiked] = useState(liked);
    const [localLikeCount, setlocalLikeCount] = useState(likeCount);

    const handleLocalLike = () => {
        setLocalLiked(!localLiked)
        setlocalLikeCount(localLikeCount + 1)
        handleLike(thought)
    }

    const handleLocalDislike = () => {
        setLocalLiked(!localLiked)
        setlocalLikeCount(localLikeCount - 1)
        handleDislike(thought)
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {thought.author.photo ? (
                    <Image source={{ uri: thought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {thought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{thought?.author?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(thought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>{thought.content}</Text>
                    </View>
                </View>
                <View style={styles.thoughtInteractions}>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={localLiked ? () => handleLocalDislike() : () => handleLocalLike()}
                    >
                        {localLiked ? (
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
                            {localLikeCount}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionNumber} onPress={() => setParent(thought)}>
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
        </View>
    )
}

export default ThoughtForumThought;