import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, RefreshControl } from "react-native";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import LogoHeader from "../../components/LogoHeader";
import NearYou from "../../components/NearYou";
import YourThoughts from "../../components/YourThoughts";
import NewThought from "../../components/NewThought";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { getOneUser, resetUser } from "../../slices/getOneUser";
import { getActiveThoughts, resetActiveThoughts } from "../../slices/getActiveThoughts";
import { getInactiveThoughts, resetInactiveThoughts } from "../../slices/getInactiveThoughts";
import * as Location from 'expo-location';
import getLocation from "../../data/getLocation";
import getLocationPermission from "../../data/getLocationPermission";
import { getNearbyThoughts, resetNearbyThoughts } from "../../slices/getNearbyThoughts";
import geohash from "ngeohash";

const Home = () => {
    const [title, setTitle] = useState("Near You");
    const [titleId, setTitleId] = useState("1");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [location, setLocation] = useState([]);
    const [hash, setHash] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
        dispatch(resetUser());
        dispatch(resetActiveThoughts());
        dispatch(resetInactiveThoughts());
        dispatch(resetNearbyThoughts());
    }

    const getLoc = async () => {
        const locPermission = await getLocationPermission();
        const loc = await getLocation();
        setLocation([loc.coords.longitude, loc.coords.latitude]);
        setHash(geohash.encode(loc.coords.latitude, loc.coords.longitude, 9))
    };

    const homeScreens = [
        {
            id: "1",
            title: "Near You"
        },
        {
            id: "2",
            title: "Your Thoughts"
        }
    ]

    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    };

    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 179]
                })
            }
        ]
    };

    useEffect(() => {
        getLoc();
    }, []);

    useEffect(() => {
        getLoc();
        dispatch(getNearbyThoughts(location[1], location[0], 5))
    }, [dispatch]);


    const onRefresh = async () => {
        setRefreshing(true);
        getLoc();
        dispatch(getNearbyThoughts(location[1], location[0], 5))
        setRefreshing(false);
    };


    return (
        <View style={styles.bigContainer}>
            <LogoHeader />
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <Animated.View style={[styles.highlight, highlightStyle]} />
                    {homeScreens.map((data, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => titleIdFunc(data.id, data.title)}
                            style={styles.navigatorText}
                        >
                            <Text style={{ color: data.id === titleId ? "black" : "white" }}>
                                {data.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <NewThought />
                    {title === "Near You" && <NearYou />}
                    {title === "Your Thoughts" && <YourThoughts />}
                </ScrollView>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text>Go back</Text>
                </TouchableOpacity>
                <Text>{location}</Text>
                <Text>{hash}</Text>
            </View>
        </View>
    );
}

export default Home;
