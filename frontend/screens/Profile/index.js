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

const Profile = () => {
    const [image, setImage] = useState("");
    const { user } = useSelector((state) => state.userSlice);
    console.log(user)
    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    const [parkedThoughts, setParkedThoughts] = useState(0);
    const [fileName, setFileName] = useState("");

    const calcParkedThoughts = () => {
        let parkedThoughts = 0;
        for (thought of activeThoughts) {
            if (thought.parked) {
                parkedThoughts += 1;
            }
        }
        return parkedThoughts
    }

    useEffect(() => {
        const parkedNo = calcParkedThoughts()
        setParkedThoughts(parkedNo)
    }, [activeThoughts])

    const selectImage = async () => {
        const pickedImage = await pickImage();
        setImage(pickedImage.uri)
        setFileName(pickedImage.fileName);
    }

    const uploadFileToS3 = async (blob, key) => {
        try {
            const result = await uploadData({
                key: key,
                data: blob,
                options: {
                    accessLevel: undefined
                }
            }).result;
            //console.log('Succeeded: ', result);
            return result.key;
        } catch (error) {
            //console.log('Error : ', error);
        }
        return '';
    };

    return (
        <View style={styles.backgroundContainer}>
            <Image source={background} style={styles.backgroundImage} />
            {user.photo ? (
                <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
                    <Image source={{ uri: user.photo }} style={{
                        objectFit: "cover", width: 169.346,
                        height: 169.346, borderRadius: 100
                    }} />
                </TouchableOpacity>
            ) :
                (
                    <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
                        <Image source={defaultProfilePic} style={{
                            objectFit: "contain", width: 169.346,
                            height: 169.346, borderRadius: 100
                        }} />
                    </TouchableOpacity>
                )
            }
            <ScrollView style={styles.container}>
                <TouchableOpacity>
                    <Text style={{ color: "yellow", textAlign: "center" }}>push to s3</Text>
                </TouchableOpacity>
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
                            <Text style={styles.number}>{parkedThoughts}</Text>
                        </View>
                        <Text style={styles.titleParked}>Parked</Text>
                    </TouchableOpacity>
                </View>
                {activeThoughts[0] &&
                    <View style={styles.latestThoughtContainer}>
                        <View style={styles.titleTimeContainer}>
                            <Text style={styles.latestThought}>Latest Thought</Text>
                            <Text style={styles.time}>{formatDate(activeThoughts[0]?.createdAt)}</Text>
                        </View>
                        <Text style={styles.thought}>{activeThoughts[0]?.content}</Text>
                    </View>}
                <Image source={user.photo} />
            </ScrollView>
        </View>

    )
}

export default Profile