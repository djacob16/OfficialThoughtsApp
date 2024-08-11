import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, RefreshControl, Dimensions } from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import { resetUser } from "../../slices/getOneUser";
import { resetActiveThoughts } from "../../slices/getActiveThoughts";
import { resetInactiveThoughts } from "../../slices/getInactiveThoughts";
import getLocation from "../../data/getLocation";
import { getNearbyThoughts, resetNearbyThoughts } from "../../slices/getNearbyThoughts";
import { updateActiveUnparkedThoughts } from "../../data/updateActiveUnparkedThoughts";
import geohash from "ngeohash";
import LogoHeader from "../../components/LogoHeader";
import NearYou from "../../components/NearYou";
import YourThoughts from "../../components/YourThoughts";
import NewThought from "../../components/NewThought";

const Home = () => {
    const [title, setTitle] = useState("Near You");
    const [titleId, setTitleId] = useState("1");
    const [location, setLocation] = useState([]);
    const [hash, setHash] = useState();
    const [locationPermission, setLocationPermission] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;

    const paddingTop = useRef(new Animated.Value(60)).current; // Initial padding top
    const logoOpacity = useRef(new Animated.Value(1)).current; // Initial opacity

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

    const onScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // Fade the logo as you scroll down, bring it back as you scroll up
        Animated.timing(logoOpacity, {
            toValue: scrollY > 20 ? -1 : 1,
            duration: 30,
            useNativeDriver: true,
        }).start();

        // Adjust paddingTop based on scroll position
        Animated.timing(paddingTop, {
            toValue: scrollY > 20 ? 0 : 60,
            duration: 80,
            useNativeDriver: false
        }).start();
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
        }, 500000)
        return () => clearInterval(intervalId);
    }, [location])

    return (
        <Animated.View style={[styles.bigContainer, { paddingTop: paddingTop }]}>
            <Animated.View style={{ opacity: logoOpacity }}>
                <LogoHeader />
            </Animated.View>
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
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                >
                    <NewThought hash={hash} />
                    {!locationPermission && <Text style={{ color: "white", paddingHorizontal: 16, textAlign: "center", color: "red" }}>can not show near you thoughts because location was not allowed</Text>}
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
        </Animated.View>
    );
}

export default Home;
