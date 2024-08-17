import React, { useEffect, useState } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../data/formatDate";
import FastImage from "react-native-fast-image";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png";
import parkedIcon from "../../assets/mappinParked.png";
import heartFillIcon from "../../assets/heart.fill.png";
import { likeThought, checkLiked } from "../../data/likeThought";
import { useNavigation } from "@react-navigation/native";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import Video from "react-native-video";
import xmark from "../../assets/xmark.png"

const NearbyThought = ({ thought }) => {
    const { user } = useSelector((state) => state.userSlice);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const init = async () => {
            setCommentCount(calcTotalComments(thought));
            setLikeCount(thought.likes);
            const isLiked = await checkLiked(thought);
            setLiked(isLiked);
        };
        init();

        if (thought.photo?.slice(-4) === ".jpg") {
            FastImage.preload([{ uri: thought.photo }]);
        }
    }, [thought]);

    const calcTotalComments = (thought) => {
        let total = 0;
        // thought?.comments?.items.forEach((comment) => {
        //     if (comment) {
        //         total += 1;
        //     }
        //     comment?.replies?.items.forEach((reply) => {
        //         if (reply) {
        //             total += 1;
        //         }
        //     });
        // });
        return total;
    };

    const handleLike = (thought) => {
        setLiked(true);
        setLikeCount(likeCount + 1);
        likeThought(thought, true);
    };

    const handleDislike = (thought) => {
        setLiked(false);
        setLikeCount(likeCount - 1);
        likeThought(thought, false);
    };

    const openImage = () => {
        setModalVisible(true);
    };

    const closeImage = () => {
        setModalVisible(false);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("CommentForum", { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount })}
        >
            <View style={styles.profileContainer}>
                {!thought?.anonymous ? (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: thought.author.id })}>
                        <FastImage source={{ uri: thought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    </TouchableOpacity>
                ) : (
                    <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                )}
            </View>
            <View style={styles.midSectionContainer}>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {thought?.anonymous ? (
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
                        {thought.photo && (
                            <>
                                {thought.photo.slice(-4) === ".jpg" && (
                                    <View style={styles.mediaContainer}>
                                        {imageLoading && <ActivityIndicator style={styles.loader} />}
                                        <TouchableOpacity onPress={openImage}>
                                            <FastImage
                                                source={{ uri: thought.photo }}
                                                style={[styles.photo, imageLoading && styles.hiddenImage]}
                                                onLoadStart={() => setImageLoading(true)}
                                                onLoadEnd={() => setImageLoading(false)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {thought.photo.slice(-4) === ".mp4" && (
                                    <Video
                                        source={{ uri: thought.photo }}
                                        resizeMode="contain"
                                        controls={true}
                                        style={styles.video}
                                        onError={(error) => console.log('Video Error:', error)}
                                        onLoadStart={() => console.log('Video Loading Started')}
                                        onBuffer={() => console.log('Video Buffering')}
                                    />
                                )}
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.thoughtInteractions}>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={liked ? () => handleDislike(thought) : () => handleLike(thought)}
                    >
                        <FastImage source={liked ? heartFillIcon : heartIcon} style={styles.icon} />
                        <Text style={styles.number}>{likeCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.interactionNumber}
                        onPress={() => navigation.navigate("CommentForum", { thought, likeCount, liked, handleLike, handleDislike, commentCount, setCommentCount })}
                    >
                        <FastImage source={commentIcon} style={styles.icon} />
                        <Text style={styles.number}>{commentCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage source={shareIcon} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage source={threeDots} style={styles.threeDotsIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.parkedDistanceContainer}>
                {thought.parked && (
                    <View style={styles.parkedDistance}>
                        <FastImage style={styles.parkedIcon} source={parkedIcon} />
                        <Text style={styles.parkedText}>15</Text>
                    </View>
                )}
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeImage}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={closeImage} style={styles.closeButton}>
                        <Image style={styles.closeButton} source={xmark} />
                    </TouchableOpacity>
                    <FastImage source={{ uri: thought.photo }} style={styles.fullScreenImage} resizeMode="contain" />
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

export default NearbyThought;
