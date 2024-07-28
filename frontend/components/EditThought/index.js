import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import editOneThought from "../../data/editOneThought";
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import inactiveBulb from "../../assets/lightbulbFillinactive.png"
import yellowPin from "../../assets/mappinParked.png"
import whitePin from "../../assets/mappin.png"
import { useNavigation } from "@react-navigation/native";

const EditThought = () => {
    const route = useRoute();
    const { activeThought } = route.params
    const [content, setContent] = useState(activeThought.content);
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
            <Text>Edit Thought</Text>
            <TouchableOpacity onPress={edit}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(!active)}>
                <Image source={active ? lightBulbFillIcon : inactiveBulb} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setParked(!parked)}>
                <Image source={parked ? yellowPin : whitePin} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.anonymousContainer} onPress={() => setAnonymous(!anonymous)} >
                <Text style={anonymous ? styles.anonymous : styles.notAnonymous}>Anonymous</Text>
            </TouchableOpacity>
            <TextInput value={content} style={styles.input} onChangeText={setContent} />
        </View>
    )
}

export default EditThought;