import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png"
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFillinactive.png"
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import styles from "./styles";
import editOneThought from "../../data/editOneThought";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Video from "react-native-video";

const YourInactiveThought = ({ inactiveThought }) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.userSlice.user);
    const [animatedValue] = useState(new Animated.Value(0));
    const [fullAnimatedValue] = useState(new Animated.Value(1));

    const deleteFunc = () => {
        deleteOneThought(inactiveThought.id);
    }

    const toggleActiveStatus = async () => {
        const newActiveStatus = !inactiveThought.active;

        await editOneThought(
            inactiveThought.id,
            inactiveThought.content,
            newActiveStatus,
            inactiveThought.parked,
            inactiveThought.anonymous
        )
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }, [inactiveThought]);

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
                    {inactiveThought.author.photo ? (
                        <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: inactiveThought.author.id })}>
                            <Image source={{ uri: inactiveThought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                    )}
                </View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {inactiveThought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{user?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(inactiveThought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>{inactiveThought.content}</Text>
                        {inactiveThought.photo?.slice(-4) === ".jpg" && <Image source={{ uri: inactiveThought.photo }} style={styles.photo} />}
                        {inactiveThought.photo?.slice(-4) === ".mp4" && <Video source={{ uri: inactiveThought.photo }} resizeMode="contain" controls={true} style={styles.video} />}
                    </View>
                    {/* <View style={styles.thoughtTags}>
                        <Text style={styles.tags}>no tags yet</Text>
                    </View> */}
                    <View style={styles.thoughtInteractions}>
                        <View style={styles.interactionNumber}>
                            <Image source={heartIcon} style={styles.icon} />
                            <Text style={styles.number}>{inactiveThought.likes}</Text>
                        </View>
                        <View style={styles.interactionNumber}>
                            <Image source={commentIcon} style={styles.icon} />
                            <Text style={styles.number}>2</Text>
                        </View>
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
    )
}

export default YourInactiveThought;