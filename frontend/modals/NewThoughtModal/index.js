import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native"
import styles from "./styles"
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import defaultProfilePic from "../../assets/defaultprofilepic.png"
import Poll from "../../components/Poll";
import { Colors } from "../../constants/colors";
import Music from "../../components/Music";


const NewThoughtModal = () => {
    const route = useRoute();
    const { type, setTrack } = route.params
    const navigation = useNavigation()
    const [anonymous, setAnonymous] = useState(false);
    console.log(type)

    const { user } = useSelector((state) => state.userSlice);

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.backgroundColor }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancelText}>cancel</Text></TouchableOpacity>
                <Text style={styles.headerText}>New thought</Text>
                <Text>        </Text>
            </View>
            <View style={styles.bodyContainer}>
                {(type == "camera" || type == "media") && <Text style={{ flex: 1, alignSelf: "center", marginTop: 300, color: "white", fontSize: 20 }}>built in camera coming soon!</Text>}
                {type == "music" && <Music setTrack={setTrack} />}
                {type == "gif" && <Text style={{ flex: 1, alignSelf: "center", marginTop: 300, color: "white", fontSize: 20 }}>gifs coming soon!</Text>}
                {type == "poll" && <Poll />}
            </View>
        </KeyboardAvoidingView>
    )
}

export default NewThoughtModal