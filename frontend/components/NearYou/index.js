import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import heart from '../../assets/heartIcon.png';
import * as Location from 'expo-location';
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { useDispatch, useSelector } from "react-redux";

const NearYou = ({ setRefreshing }) => {
    const [location, setLocation] = useState([]);
    const dispatch = useDispatch();

    const getLoc = async () => {
        const loc = await getLocation();
        setLocation([loc.coords.longitude, loc.coords.latitude]);
    }


    const { nearbyThoughts } = useSelector((state) => state.getNearbyThoughtsSlice);

    return (
        <View>
            {nearbyThoughts.map((thought, index) => (
                <View key={index}>
                    <Text style={{ color: "red" }}>
                        {thought.anonymous ? "Anonymous" : (<Text style={{ color: "white" }}>{thought?.author?.displayName}</Text>)}
                    </Text>
                    <Text style={{ color: "white" }}>{thought?.content}</Text>

                </View>
            ))}
        </View>
    );
};

export default NearYou;
