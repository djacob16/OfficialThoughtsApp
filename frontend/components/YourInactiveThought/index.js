import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal, Animated, Easing } from 'react-native';
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png"
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFillinactive.png"
import EditThought from "../EditThought";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import styles from "./styles";
import editOneThought from "../../data/editOneThought";
import { checkLiked } from "../../data/likeThought";

const YourInactiveThought = ({ inactiveThought }) => {
    const [displayName, setDisplayName] = useState("");
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
                <View>
                    <View style={styles.profileContainer}></View>
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
                            {inactiveThought.photo &&
                                <Image source={{ uri: inactiveThought.photo }} style={{ width: "100%", height: 250, marginBottom: 20, borderRadius: 10, marginTop: 10 }} />
                            }
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