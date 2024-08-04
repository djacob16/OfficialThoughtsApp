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

const ThoughtForumThought = ({ thought, likeCount, liked, handleDislike, handleLike, commentCount }) => {
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
            <View>
                <View style={styles.profileContainer}></View>
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
                    <TouchableOpacity style={styles.interactionNumber}>
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