import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import editOneThought from "../../data/editOneThought";
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import camIcon from "../../assets/camera-01.png"
import picIcon from "../../assets/image-01.png"
import musicIcon from "../../assets/note-02.png"
import giphyIcon from "../../assets/gif.png"
import pollIcon from "../../assets/Frame 944.png"
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import inactiveBulb from "../../assets/lightbulbFillinactive.png"
import yellowPin from "../../assets/mappinParked.png"
import whitePin from "../../assets/mappin.png"
import { useNavigation } from "@react-navigation/native";

const EditThought = () => {
    const route = useRoute();
    const { activeThought } = route.params
    const [content, setContent] = useState(activeThought.content);
    const [image, setImage] = useState(activeThought.photo ? activeThought.photo : null);
    const [active, setActive] = useState(activeThought.active)
    const [parked, setParked] = useState(activeThought.parked);
    const [anonymous, setAnonymous] = useState(activeThought.anonymous);
    const navigation = useNavigation();

    const edit = () => {
        editOneThought(activeThought.id, content, active, parked, anonymous)
        navigation.navigate("Main")
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancleText}>cancle</Text></TouchableOpacity>
                <Text style={styles.headerText}>Edit Thought</Text>
                <Text>        </Text>
            </View>

            <ScrollView style={styles.bodyContainer}>
                <TextInput value={content} style={styles.input} onChangeText={setContent} multiline={true} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, marginTop: 20 }}>
                    <TouchableOpacity style={styles.anonymousContainer} onPress={() => setAnonymous(!anonymous)} >
                        <Text style={anonymous ? styles.anonymous : styles.notAnonymous}>Anonymous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setParked(!parked)}>
                        <Image source={parked ? yellowPin : whitePin} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {activeThought.photo && <Image source={{ uri: image }} style={{ width: "100%", height: 200, borderRadius: 10 }} resizeMode="cover" />}

                <View style={styles.inputBottomLeftContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={edit}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditThought;