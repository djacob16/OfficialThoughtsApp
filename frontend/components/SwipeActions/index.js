import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import styles from "./styles";
import lightbulb from "../../assets/lightbulbFill.png";
import trashIcon from "../../assets/trashIconWhite.png";

const SwipeActions = ({ progress, dragX, toggleActiveStatus, deleteFunc }) => {

    const translateX = dragX.interpolate({
        inputRange: [-160, 0],
        outputRange: [0, 160],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[styles.rightActionsContainer, { transform: [{ translateX }] }]}>
            <TouchableOpacity style={styles.toggleContainer} onPress={toggleActiveStatus}>
                <Image source={lightbulb} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteContainer} onPress={deleteFunc}>
                <Image source={trashIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
        </Animated.View>
    );
}

export default SwipeActions;