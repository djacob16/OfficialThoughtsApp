import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import styles from "./styles";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import editOneThought from "../../data/editOneThought";

const YourActiveThought = ({ activeThought }) => {
    const navigation = useNavigation();
    const [displayName, setDisplayName] = useState("");
    const user = useSelector((state) => state.userSlice.user);
    const [animatedValue] = useState(new Animated.Value(0));
    const [fullAnimatedValue] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 350,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(1);
        });
    }, [activeThought]);

    const edit = () => {
        navigation.navigate("EditThought", { activeThought });
    };

    const deleteFunc = () => {
        deleteOneThought(activeThought.id);
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
                <View>
                    <View style={styles.profileContainer}></View>
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
                        </View>
                        <View style={styles.thoughtInteractions}>
                            <View style={styles.interactionNumber}>
                                <Image source={heartIcon} style={styles.icon} />
                                <Text style={styles.number}>2</Text>
                            </View>
                            <View style={styles.interactionNumber}>
                                <Image source={commentIcon} style={styles.icon} />
                                <Text style={styles.number}>2</Text>
                            </View>
                            <TouchableOpacity style={styles.interactionNumber} onPress={edit}>
                                <Image source={pencilIcon} style={styles.pencilIcon} />
                            </TouchableOpacity>
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
    );
};

export default YourActiveThought;
