import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, RefreshControl } from "react-native";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import LogoHeader from "../../components/LogoHeader";
import NearYou from "../../components/NearYou";
import YourThoughts from "../../components/YourThoughts/"
import styles from "./styles";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import NewThought from "../../components/NewThought";
import * as Location from 'expo-location';


const Home = () => {
    const navigation = useNavigation();

    // navigator
    const [title, setTitle] = useState("Your Thoughts");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const [titleId, setTitleId] = useState("1");

    // user
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [location, setLocation] = useState([]);
    const [hash, setHash] = useState();


    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
    }

    const getLocation = async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation([currentLocation.coords.longitude, currentLocation.coords.latitude]);
        } catch (error) {
            console.error("Error getting location:", error);
        }
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
                    outputRange: [0, 179]
                })
            }
        ]
    };

    const getLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation([currentLocation.coords.longitude, currentLocation.coords.latitude]);
        } catch (error) {
            console.log('Error getting location:', error);
        }
    };

    useEffect(() => {
        getLocation()
    }, [])

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
                            <Text style={{ color: data.id == titleId ? "black" : "white" }}>
                                {data.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <NewThought />
                    {title === "Your Thoughts" && <YourThoughts />}
                    {title === "Near You" && <NearYou />}
                </ScrollView>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text>Go back</Text>
                </TouchableOpacity>
                <Text>{location}</Text>
            </View>
        </View>
    )
}

export default Home;