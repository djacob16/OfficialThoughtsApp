import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions, Animated } from "react-native";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import BackArrow from "../../components/BackArrow";
import { getUserById } from "../../data/getUserById";
import ProfileThought from "../../components/ProfileThought";
import listThoughtsByAuthor from "../../data/listThoughtsByAuthor";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import mappinGreen from "../../assets/mappinGreen.png";
import verifiedIcon from "../../assets/verifiedIcon.png";
import background from "../../assets/profileBackground.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import list from "../../assets/list.png"
import listFocused from "../../assets/listFocused.png"
import grid from "../../assets/grid.png"
import gridFocused from "../../assets/gridFocused.png"
import NearbyThought from "../../components/NearbyThought";
import profileAura from "../../assets/profileAura.png"
import { useNavigation } from "@react-navigation/native";
import backArrow from "../../assets/chevron-left.png"
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

const Profile = () => {
    const route = useRoute();
    const { userId } = route.params;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [profileThoughts, setProfileThoughts] = useState([]);
    const [title, setTitle] = useState("Thoughts");
    const [titleId, setTitleId] = useState("1");
    const windowWidth = Dimensions.get('window').width;
    const [view, setView] = useState("list");
    const navigation = useNavigation()

    const highlightPosition = useRef(new Animated.Value(0)).current;

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
                    outputRange: [windowWidth * .23, windowWidth * .50]
                })
            }
        ]
    };
    const thoughtCategories = [
        {
            id: "1",
            title: "Thoughts"
        },
        {
            id: "2",
            title: "Parked"
        }
    ]

    // Function to get user data from AsyncStorage
    const getUserData = async (userId) => {
        const storedUser = await AsyncStorage.getItem(`user_${userId}`);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };

    // Function to get profile thoughts from AsyncStorage
    const getProfileThoughts = async (userId) => {
        const storedThoughts = await AsyncStorage.getItem(`thoughts_${userId}`);
        if (storedThoughts) {
            setProfileThoughts(JSON.parse(storedThoughts));
        }
        setLoading(false)
    };

    function formatDateToMonthYear(dateString) {
        const date = new Date(dateString);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear();

        return `${month} ${year}`;
    }

    useEffect(() => {
        // Fetch user data and thoughts from backend
        const fetchData = async () => {
            setLoading(true);
            const userData = await getUserById(userId);
            setUser(userData);
            await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(userData)); // Save user data to AsyncStorage

            const profile = await listThoughtsByAuthor(userId);
            setProfileThoughts(profile);
            await AsyncStorage.setItem(`thoughts_${userId}`, JSON.stringify(profile)); // Save profile thoughts to AsyncStorage
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    // Use useEffect to get stored data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getUserData(userId);
                await getProfileThoughts(userId);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);


    return loading ? (
        <View style={styles.loadingContainer}></View>
    ) : (
        <ScrollView style={styles.backgroundContainer}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.goBack()}>
                <Image source={backArrow} style={styles.backArrowIcon} />
            </TouchableOpacity>
            <Image source={profileAura} style={styles.backgroundImage} />
            <TouchableOpacity style={styles.profileImage}>
                <Image
                    source={{ uri: user.photo }}
                    style={{
                        objectFit: "cover",
                        width: 160.346,
                        height: 160.346,
                        borderRadius: 100,
                    }}
                />
            </TouchableOpacity>
            <View style={styles.container}>
                {/* <BackArrow /> */}
                <View style={styles.verifiedContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Image source={verifiedIcon} style={styles.verifiedIcon} />
                </View>
                <Text style={styles.joinedText}>Joined {formatDateToMonthYear(user.createdAt)}</Text>
                <Text style={styles.description}>Just your average thought reader</Text>
                <TouchableOpacity style={styles.friendsContainer}>
                    <Text style={styles.friendsText}>Friends feature coming soon</Text>
                </TouchableOpacity>
                {/* <View style={styles.profileData}>
                    <TouchableOpacity style={styles.data}>
                        <Text style={styles.number}>{user.totalThoughts}</Text>
                        <Text style={styles.title}>Total thoughts</Text>
                    </TouchableOpacity>
                    <View style={styles.data}>
                        <Text style={styles.number}>2000</Text>
                        <Text style={styles.title}>Reactions</Text>
                    </View>
                    <TouchableOpacity style={styles.dataLast}>
                        <View style={styles.parkedContainer}>
                            <Image source={mappinGreen} style={{ width: 18, height: 18 }} />
                            <Text style={styles.number}>9</Text>
                        </View>
                        <Text style={styles.titleParked}>Parked</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.toggleViewContainer}>
                    <View style={styles.navigator}>
                        <Animated.View style={[styles.highlight, highlightStyle]} />
                        {thoughtCategories.map((data, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => titleIdFunc(data.id, data.title)}
                                style={styles.navigatorText}
                            >
                                <Text style={{ color: data.id === titleId ? "white" : "gray" }}>
                                    {data.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {view == "list" ? (
                        title == "Thoughts" &&
                        <TouchableOpacity onPress={() => setView("grid")}>
                            <Image source={view === "list" ? listFocused : list} style={styles.viewIcons} />
                        </TouchableOpacity>

                    ) : (
                        title == "Thoughts" &&
                        <TouchableOpacity onPress={() => setView("list")}>
                            <Image source={view === "grid" ? gridFocused : grid} style={styles.viewIcons} />
                        </TouchableOpacity>
                    )}
                </View>
                {title == "Thoughts" ? (
                    <View>
                        {view == "list" ? (
                            <View style={{ flexDirection: "column", flexWrap: "wrap", width: "100%", alignItems: "center" }}>
                                {profileThoughts.map((thought, index) => (
                                    <View style={{ flexDirection: "column", flexWrap: "wrap", width: "100%", alignItems: "center" }} key={index}>
                                        <NearbyThought thought={thought} />
                                        <View style={styles.line}></View>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: "center" }}>
                                {profileThoughts.map((thought, index) => (
                                    <ProfileThought key={index} thought={thought} />
                                ))}
                            </View>
                        )}
                    </View>
                ) : (
                    <Text style={styles.joinedText}>
                        map coming soon
                    </Text>
                )}
            </View>
        </ScrollView >
    );
};

export default Profile;
