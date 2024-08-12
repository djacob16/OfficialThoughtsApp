import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
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

const Profile = () => {
    const route = useRoute();
    const { userId } = route.params;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [profileThoughts, setProfileThoughts] = useState([]);

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
    };

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
        getUserData(userId);
        getProfileThoughts(userId);
    }, [userId]);

    return loading ? (
        <View style={styles.backgroundContainer}></View>
    ) : (
        <ScrollView style={styles.backgroundContainer}>
            <Image source={background} style={styles.backgroundImage} />
            {user.photo ? (
                <TouchableOpacity style={styles.profileImage}>
                    <Image
                        source={{ uri: user.photo }}
                        style={{
                            objectFit: "cover",
                            width: 169.346,
                            height: 169.346,
                            borderRadius: 100,
                        }}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.profileImage}>
                    <Image
                        source={defaultProfilePic}
                        style={{
                            objectFit: "contain",
                            width: 169.346,
                            height: 169.346,
                            borderRadius: 100,
                        }}
                    />
                </TouchableOpacity>
            )}
            <View style={styles.container}>
                <BackArrow />
                <Text style={styles.name}>{user.name}</Text>
                <View style={styles.verifiedContainer}>
                    <Image source={verifiedIcon} />
                    <Text style={styles.verified}>Verified User</Text>
                </View>
                <Text style={styles.description}>Just your average thought reader</Text>
                <View style={styles.profileData}>
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
                </View>
                <View style={{ width: "100%" }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: "center" }}>
                        {profileThoughts.map((thought, index) => (
                            <ProfileThought key={index} thought={thought} />
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
