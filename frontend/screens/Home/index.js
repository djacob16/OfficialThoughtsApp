import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, RefreshControl, Dimensions } from "react-native";
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
import { updateActiveUnparkedThoughts } from "../../data/updateActiveUnparkedThoughts";

const Home = () => {
    const [title, setTitle] = useState("Near You");
    const [titleId, setTitleId] = useState("1");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [location, setLocation] = useState([]);
    const [hash, setHash] = useState();
    const [locationPermission, setLocationPermission] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
        dispatch(resetUser());
        dispatch(resetActiveThoughts());
        dispatch(resetInactiveThoughts());
        dispatch(resetNearbyThoughts());
    }

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
                    outputRange: [0, windowWidth * .462]
                })
            }
        ]
    };

    const onRefresh = async () => {
        setRefreshing(true);
        const loc = await getLocation();
        setLocation([loc.coords.longitude, loc.coords.latitude]);
        setHash(geohash.encode(loc.coords.latitude, loc.coords.longitude, 9))
        if (hash) {
            await updateActiveUnparkedThoughts(hash);
            dispatch(getNearbyThoughts(hash));
        }
        setRefreshing(false);
    };

    useEffect(() => {
        const data = async () => {
            const loc = await getLocation();
            console.log(loc);
            if (loc == "Permission to access location was denied") {
                console.log("can not show near you thoguhts bc location was not allowed")
                setLocationPermission(false)
            } if (loc) {
                setLocation([loc.coords.longitude, loc.coords.latitude]);
                setHash(geohash.encode(loc.coords.latitude, loc.coords.longitude, 9))
                setLocationPermission(true)
            }
        }
        data();
    }, [])

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const loc = await getLocation();
            setLocation([loc.coords.longitude, loc.coords.latitude]);
            setHash(geohash.encode(loc.coords.latitude, loc.coords.longitude, 9))
            await updateActiveUnparkedThoughts(hash);
            console.log("succssefully updated locations of all active unparked thoguhts")
        }, 500000)
        return () => clearInterval(intervalId);
    }, [location])

    return (
        <View style={styles.bigContainer}>
            <LogoHeader />
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 16 }}>
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
                    <NewThought hash={hash} />
                    {!locationPermission && <Text style={{ color: "white", paddingHorizontal: 16, textAlign: "center", color: "red" }}>can not show near you thoguhts bc location was not allowed</Text>}
                    {hash && title === "Near You" && <NearYou hash={hash} />}
                    {title === "Your Thoughts" && <YourThoughts />}
                </ScrollView>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text>Go back</Text>
                </TouchableOpacity>
                {locationPermission &&
                    <>
                        <Text>{location}</Text>
                        <Text>{hash}</Text>
                    </>
                }
            </View>
        </View>
    );
}

export default Home;
