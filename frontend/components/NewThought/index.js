import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import styles from './styles';
import camIcon from "../../assets/camera-01.png"
import picIcon from "../../assets/image-01.png"
import musicIcon from "../../assets/note-02.png"
import giphyIcon from "../../assets/giphy.png"
import pollIcon from "../../assets/Frame 944.png"

const NewThought = ({ name, userId }) => {
    const [content, setContent] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.inputTopContainer}>
                <Text style={styles.name}>Hey, {name}</Text>
                <TouchableOpacity style={styles.postButton}>
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
            <View style={styles.inputBottomLeftContainer}>
                <View style={styles.inputBottomContainer}>
                    <Image source={camIcon} style={styles.icon} />
                    <Image source={picIcon} style={styles.icon} />
                    <Image source={musicIcon} style={styles.icon} />
                    <Image source={pollIcon} style={styles.icon} />
                </View>
                <View>
                    <Image />
                    <Image />
                </View>
            </View>
        </View>
    )
}

export default NewThought;