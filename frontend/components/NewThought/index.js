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
import uploadThoughtPhotos from "../../data/uploadThoughtPhotos";
import { uploadData } from 'aws-amplify/storage';

const NewThought = ({ hash }) => {
    const client = generateClient();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("")
    const [active, setActive] = useState(true)
    const [parked, setParked] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [pickedImage, setPickedImage] = useState("");
    const [imgData, setImgData] = useState("");
    const [key, setKey] = useState("");
    const [uploadKey, setUploadKey] = useState("")

    const user = useSelector((state) => state.userSlice.user);

    const toS3 = async () => {
        const data = await uploadThoughtPhotos();
        setPickedImage(data.imagePath);
        setImgData(data.imageData);
        setKey(data.key);
        console.log("key: ", data.key)
        console.log("imgData: ", data.imageData)
    }

    const postNewThought = async () => {
        const bucket = "officialthoughtsapp1f893ea772a043c594941011a17a247be-staging";
        if (imgData && key) {
            try {
                const result = await uploadData({
                    key: key,
                    data: imgData,
                    options: {
                        accessLevel: undefined
                    }
                }).result;
                let s3URL = `https://${bucket}.s3.us-east-2.amazonaws.com/public/${result.key}`;
                if (content && hash) {
                    setContent("");
                    setPickedImage("");
                    setUploadKey("");
                    const response = await postOneThought(content, active, parked, hash, anonymous, user, s3URL);
                    s3URL = "";
                    setImgData("");
                    setKey("");
                    setActive(true);
                    setAnonymous(false);
                    setParked(false);
                }
            } catch (error) {
                console.log('Error : ', error);
            }
        } else {
            if (content && hash) {
                setContent("");
                setPickedImage("");
                setUploadKey("");
                const response = await postOneThought(content, active, parked, hash, anonymous, user);
                setActive(true);
                setAnonymous(false);
                setParked(false);
            }
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
            {pickedImage && <Image source={{ uri: pickedImage }} style={{ width: "100%", height: 250, marginBottom: 20, borderRadius: 10 }} />}
            <View style={styles.inputBottomContainer}>
                <View style={styles.inputBottomLeftContainer}>
                    <Image source={camIcon} style={styles.icon} />
                    <TouchableOpacity onPress={toS3}>
                        <Image source={picIcon} style={styles.icon} />
                    </TouchableOpacity>
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
