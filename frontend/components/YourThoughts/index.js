import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';


const YourThoughts = ({ name, userId }) => {
    return (
        <View>
            <Text style={styles.thoughtText}>{name}</Text>
            <Text style={styles.thoughtText}>{userId}</Text>
        </View>
    );
}

export default YourThoughts;
