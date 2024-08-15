import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import heartFillIcon from "../../assets/heart.fill.png";
import commentIcon from "../../assets/message.png";
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import editOneThought from "../../data/editOneThought";
import { checkLiked, likeThought } from "../../data/likeThought";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Toast from 'react-native-toast-message';

const YourActiveThought = ({ activeThought }) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.userSlice.user);
    const [animatedValue] = useState(new Animated.Value(0));
    const [likeCount, setLikeCount] = useState(activeThought.likes || 0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLikeCount(activeThought.likes);
            const isLiked = await checkLiked(activeThought);
            setLiked(isLiked);
        }
        init();
    }, [activeThought]);

    const handleLike = (activeThought) => {
        setLiked(true);
        setLikeCount(prevLikeCount => prevLikeCount + 1);
        likeThought(activeThought, true);
    };

    const handleDislike = (activeThought) => {
        setLiked(false);
        setLikeCount(prevLikeCount => prevLikeCount - 1);
        likeThought(activeThought, false);
    };

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 550,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }, [activeThought]);

    const edit = () => {
        navigation.navigate("EditThought", { activeThought });
    };

    const deleteFunc = async () => {
        const response = await deleteOneThought(activeThought.id);
        console.log(response)
        if (response.status === "success") {
            Toast.show({
                type: 'success',
                text1: 'Thought deleted successfully!',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error deleting thought',
            });
        }
    };

    const toggleActiveStatus = async () => {
        const newActiveStatus = !activeThought.active;

        await editOneThought(
            activeThought.id,
            activeThought.content,
            newActiveStatus,
            activeThought.parked,
            activeThought.anonymous
        );
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 350,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    };

    const animatedStyle = {
        opacity: animatedValue,
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                }),
            },
        ],
    };

    return (
        <Animated.View style={animatedStyle}>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    {activeThought && activeThought.author && activeThought.author.photo ? (
                        <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: activeThought.author.id })}>
                            <Image source={{ uri: activeThought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    )}
                </View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {activeThought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{user?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>{activeThought.content}</Text>
                        <TouchableOpacity>
                            {activeThought.photo?.slice(-4) === ".jpg" && <Image source={{ uri: activeThought.photo }} style={styles.photo} />}
                            {activeThought.photo?.slice(-4) === ".mp4" && <Video source={{ uri: activeThought.photo }} resizeMode="contain" controls={true} style={styles.video} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.thoughtInteractions}>
                        <TouchableOpacity
                            style={styles.interactionNumber}
                            onPress={liked ? () => handleDislike(activeThought) : () => handleLike(activeThought)}
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
                        <View style={styles.interactionNumber}>
                            <Image source={commentIcon} style={styles.icon} />
                            <Text style={styles.number}>2</Text>
                        </View>
                        <TouchableOpacity style={styles.interactionNumber} onPress={edit}>
                            <Image source={pencilIcon} style={styles.pencilIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.thoughtControllers}>
                    <TouchableOpacity onPress={toggleActiveStatus}>
                        <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteFunc}>
                        <Image source={trasIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default YourActiveThought;
