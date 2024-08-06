import styles from "./styles";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import background from "../../assets/profileBackground.png"
import { useSelector } from "react-redux";
import verifiedIcon from "../../assets/verifiedIcon.png"
import mappinGreen from "../../assets/mappinGreen.png"
import formatDate from "../../data/formatDate";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { pickImage } from "../../data/pickImage";
import { uploadData } from "aws-amplify/storage";
import { updateUser } from "../../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { useRoute } from "@react-navigation/native";
import BackArrow from "../../components/BackArrow";
import { getUserById } from "../../data/getUserById";

const Profile = () => {
    const route = useRoute()
    const { userId } = route.params;
    // const [image, setImage] = useState("");
    // const [fileName, setFileName] = useState("");
    const [user, setUser] = useState({})
    // const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    // const [parkedThoughts, setParkedThoughts] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            const user = await getUserById(userId);
            setUser(user);
            setLoading(false);
        }
        fetchUser()
    }, [userId])

    return (
        loading ? (<View style={styles.backgroundContainer}></View>) : (<View style={styles.backgroundContainer}>
            <Image source={background} style={styles.backgroundImage} />
            {user.photo ? (
                <TouchableOpacity style={styles.profileImage}>
                    <Image source={{ uri: user.photo }} style={{
                        objectFit: "cover", width: 169.346,
                        height: 169.346, borderRadius: 100
                    }} />
                </TouchableOpacity>
            ) :
                (
                    <TouchableOpacity style={styles.profileImage}>
                        <Image source={defaultProfilePic} style={{
                            objectFit: "contain", width: 169.346,
                            height: 169.346, borderRadius: 100
                        }} />
                    </TouchableOpacity>
                )
            }
            <ScrollView style={styles.container}>
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
            </ScrollView>
        </View>)
    )
}

export default Profile