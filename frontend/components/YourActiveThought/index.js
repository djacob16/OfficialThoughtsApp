import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import styles from "./styles"
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png"
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import EditThought from "../EditThought";
import { useNavigation } from "@react-navigation/native";

const YourActiveThought = ({ activeThought }) => {
    const navigation = useNavigation();

    const edit = () => {
        navigation.navigate("EditThought", { activeThought })
    }

    return (
        <View style={styles.container}>
            <View style={styles.usernameTimeContainer}>
                <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                <Text style={styles.content}>{activeThought.content}</Text>
            </View>
            <View style={styles.interactionsContainer}>
                <View style={styles.interactionNumber}>
                    <Image source={heartIcon} style={styles.icon} />
                    <Text style={styles.number}>2</Text>
                </View>
                <View style={styles.interactionNumber}>
                    <Image source={commentIcon} style={styles.icon} />
                    <Text style={styles.number}>2</Text>
                </View>
                <TouchableOpacity style={styles.interactionNumber} onPress={edit}>
                    <Image source={pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default YourActiveThought;