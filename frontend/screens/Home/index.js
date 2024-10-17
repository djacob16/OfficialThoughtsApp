import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, RefreshControl, FlatList, Dimensions, AppState } from "react-native";
import styles from "./styles";
// tools
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// helper functions
import getLocation from "../../data/getLocation";
import { getNearbyThoughts, resetNearbyThoughts } from "../../slices/getNearbyThoughts";
import { updateActiveUnparkedThoughts } from "../../data/updateActiveUnparkedThoughts";
import { startLocationSubscription, stopLocationSubscription } from "../../utils/locationSubscription";
// sub components
import LogoHeader from "../../components/LogoHeader";
import NearYou from "../../components/NearYou";
import YourThoughts from "../../components/YourThoughts";
import NewThought from "../../components/NewThought";
// spotify tokens related
import { refreshAccessToken } from "../../data/exchangeCodeForToken";

const Home = () => {
    // navigation related
    const [title, setTitle] = useState("Near You");
    const [titleId, setTitleId] = useState("1");
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    // location related
    const [hash, setHash] = useState();
    const [locationPermission, setLocationPermission] = useState(true);
    // refresh related
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    // animation related
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const paddingTop = useRef(new Animated.Value(60)).current;
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const [scrollY, setScrollY] = useState(0);
    // app state
    const appState = useRef(AppState.currentState);

    // init
    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // sets new hash
                startLocationSubscription()
                const newHash = await AsyncStorage.getItem("@hash")
                setHash(newHash)

                // refreshes token 
                const storedRefreshToken = await AsyncStorage.getItem('spotifyRefreshToken');
                if (storedRefreshToken !== null) {
                    const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
                    const expiryTime = new Date(expiryString);
                    const currentTime = new Date();
                    if (currentTime >= expiryTime) {
                        await refreshAccessToken()
                        console.log("access token has been updated")
                    }
                    console.log("access token has been updated")
                }
            }
            appState.current = nextAppState;
            console.log('AppState', appState.current);
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        const initializeLocation = async () => {
            const storedPermission = await AsyncStorage.getItem('@location_permission');
            const storedHash = await AsyncStorage.getItem('@hash');

            if (!storedPermission || !storedHash) {
                await getLocation();
                const updatedPermission = await AsyncStorage.getItem('@location_permission');
                if (updatedPermission === "granted") {
                    setLocationPermission(true);
                    const updatedHash = await AsyncStorage.getItem('@hash');
                    dispatch(getNearbyThoughts(updatedHash));
                    setHash(updatedHash);
                    startLocationSubscription()
                } else {
                    setLocationPermission(false);
                }
            } else {
                startLocationSubscription()
                setHash(storedHash);
                setLocationPermission(true)
                console.log("init ran")
            }

            // refreshes token 
            const storedRefreshToken = await AsyncStorage.getItem('spotifyRefreshToken');
            if (storedRefreshToken !== null) {
                const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
                const expiryTime = new Date(expiryString);
                const currentTime = new Date();
                if (currentTime >= expiryTime) {
                    await refreshAccessToken()
                    console.log("access token has been updated")
                }
                console.log("access token has been updated")
            }
        };

        initializeLocation();
    }, []);

    // refresh
    const onRefresh = async () => {
        setRefreshing(true);
        const storedHash = await AsyncStorage.getItem('@hash');
        if (storedHash) {
            await updateActiveUnparkedThoughts(storedHash);
            dispatch(getNearbyThoughts(storedHash));
        } else {
            await getLocation()
            const updatedHash = await AsyncStorage.getItem('@hash');
            await updateActiveUnparkedThoughts(updatedHash);
            dispatch(getNearbyThoughts(updatedHash));
        }
        const storedRefreshToken = await AsyncStorage.getItem('spotifyRefreshToken');
        if (storedRefreshToken !== null) {
            const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
            const expiryTime = new Date(expiryString);
            const currentTime = new Date();
            if (currentTime >= expiryTime) {
                await refreshAccessToken()
                console.log("access token has been updated")
            }
            console.log("access token has been updated")
        }
        setRefreshing(false);
    };

    // animations 
    const onScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setScrollY(scrollY);
        // Fade the logo
        Animated.timing(logoOpacity, {
            toValue: scrollY > 20 ? 0 : 1,
            duration: 30,
            useNativeDriver: true,
        }).start();

        // Adjust paddingTop 
        Animated.timing(paddingTop, {
            toValue: scrollY > 20 ? 0 : 60,
            duration: 80,
            useNativeDriver: false
        }).start();
    };
    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    };

    // navigator data
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
                <FlatList
                    data={[{ key: title }]}
                    renderItem={() => (
                        <>
                            <NewThought hash={hash} />
                            {!locationPermission && <Text style={{ color: "red", textAlign: "center" }}>Cannot show nearby thoughts because location was not allowed.</Text>}
                            {title === "Near You" && <NearYou />}
                            {title === "Your Thoughts" && <YourThoughts scrollY={scrollY} />}
                        </>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#ffffff"
                            colors={["#1E1E1E"]}
                        />
                    }
                    keyExtractor={() => "key"}
                    onScroll={onScroll}
                    scrollEventThrottle={2}
                />
                {/* <Text>{hash}</Text> */}
            </View>
        </Animated.View>
    );
}

export default Home;
