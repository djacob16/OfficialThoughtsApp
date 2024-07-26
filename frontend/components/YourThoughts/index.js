import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import YourActiveThought from '../YourActiveThought';

const YourThoughts = () => {
    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    const { inactiveThoughts } = useSelector((state) => state.getInactiveThoughtsSlice);

    return (
        <View style={styles.container}>
            <Text>Actively Thinking</Text>
            {activeThoughts.map((activeThought) => (
                <YourActiveThought activeThought={activeThought} />
            ))}
        </View>
    );
}

export default YourThoughts;
