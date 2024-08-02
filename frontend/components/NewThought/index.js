import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import styles from './styles';
import camIcon from "../../assets/camera-01.png"
import picIcon from "../../assets/image-01.png"
import musicIcon from "../../assets/note-02.png"
import giphyIcon from "../../assets/gif.png"
import pollIcon from "../../assets/Frame 944.png"
import yellowPin from "../../assets/mappinParked.png"
import whitePin from "../../assets/mappin.png"
import activeBulb from "../../assets/lightbulbFill.png"
import inactiveBulb from "../../assets/lightbulbFillinactive.png"
import postOneThought from "../../data/postOneThought";
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { getOneUser } from "../../slices/getOneUser";
import { useDispatch, useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";

const NewThought = () => {
    const client = generateClient();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("")
    const [active, setActive] = useState(true)
    const [parked, setParked] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [location, setLocation] = useState([]);

    const getLocation = async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation([currentLocation.coords.longitude, currentLocation.coords.latitude]);
        } catch (error) {
            console.error("Error getting location:", error);
        }
    }

    useEffect(() => {
        getLocation();
        let locationSubscription;
        const startWatchingLocation = async () => {
            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 10000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation([newLocation.coords.longitude, newLocation.coords.latitude]);
                }
            );
        };

        startWatchingLocation();
        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    const user = useSelector((state) => state.userSlice.user);

    const postNewThought = async () => {
        if (content) {
            setContent("");
            const response = await postOneThought(content, active, parked, location[0], location[1], anonymous, user);
            setActive(true);
            setAnonymous(false);
            setParked(false);
        }
    }

    useEffect(() => {
        dispatch(getOneUser());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.inputTopContainer}>
                <Text style={styles.name}>Hey, {user?.displayName}</Text>
                <TouchableOpacity style={styles.postButton} onPress={postNewThought}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="What's on your mind..."
                placeholderTextColor={"#ffffffa6"}
                value={content}
                onChangeText={setContent} />
            <View style={styles.inputBottomContainer}>
                <View style={styles.inputBottomLeftContainer}>
                    <Image source={camIcon} style={styles.icon} />
                    <Image source={picIcon} style={styles.icon} />
                    <Image source={musicIcon} style={styles.icon} />
                    <Image source={giphyIcon} style={styles.icon} />
                    <Image source={pollIcon} style={styles.icon} />
                </View>
                <View style={styles.inputBottomRightContainer}>
                    <TouchableOpacity onPress={() => setActive(!active)}>
                        <Image source={active ? activeBulb : inactiveBulb} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setParked(!parked)}>
                        <Image source={parked ? yellowPin : whitePin} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.anonymousContainer} onPress={() => setAnonymous(!anonymous)} >
                        <Text style={anonymous ? styles.anonymous : styles.notAnonymous}>Anonymous</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default NewThought;