import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import YourActiveThought from '../YourActiveThought';
import { getActiveThoughts } from '../../slices/getActiveThoughts';
import { getInactiveThoughts } from '../../slices/getInactiveThoughts';
import YourInactiveThought from '../YourInactiveThought';

const YourThoughts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveThoughts());
        dispatch(getInactiveThoughts())
    }, [dispatch])

    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    const { inactiveThoughts } = useSelector((state) => state.getInactiveThoughtsSlice);
    console.log("activeThoughts: ", activeThoughts)
    console.log("inactiveThoughts: ", inactiveThoughts)

    return (
        <View style={styles.container}>
            <View style={styles.activeContainer}>
                <Text style={styles.activeTitle}>Actively Thinking</Text>
                {activeThoughts.map((activeThought, index) => (
                    <YourActiveThought key={index} activeThought={activeThought} />
                ))}
            </View>
            <View style={styles.inactiveContainer}>
                <Text style={styles.inactiveTitle}>In memory</Text>
                {inactiveThoughts.map((inactiveThought, index) => (
                    <YourInactiveThought key={index} inactiveThought={inactiveThought} />
                ))}
            </View>
        </View>
    );
}

export default YourThoughts;
