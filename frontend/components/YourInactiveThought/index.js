import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png"
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFillinactive.png"
import EditThought from "../EditThought";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";
import styles from "./styles";
import editOneThought from "../../data/editOneThought";

const YourInactiveThought = ({ inactiveThought }) => {
    const [displayName, setDisplayName] = useState("");

    const user = useSelector((state) => state.userSlice.user);

    const deleteFunc = () => {
        deleteOneThought(inactiveThought.id);
    }

    const toggleActiveStatus = () => {
        const newActiveStatus = !inactiveThought.active;
        editOneThought(
            inactiveThought.id,
            inactiveThought.content,
            newActiveStatus,
            inactiveThought.parked,
            inactiveThought.anonymous
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.profileContainer}></View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {inactiveThought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{user?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(inactiveThought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>
                            {inactiveThought.content}
                        </Text>
                    </View>
                    {/* <View style={styles.thoughtTags}>
                        <Text style={styles.tags}>no tags yet</Text>
                    </View> */}
                    <View style={styles.thoughtInteractions}>
                        <View style={styles.interactionNumber}>
                            <Image source={heartIcon} style={styles.icon} />
                            <Text style={styles.number}>2</Text>
                        </View>
                        <View style={styles.interactionNumber}>
                            <Image source={commentIcon} style={styles.icon} />
                            <Text style={styles.number}>2</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.thoughtControllers}>
                <TouchableOpacity onPress={toggleActiveStatus}>
                    <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteFunc}>
                    <Image source={trasIcon} style={styles.controllerIcons} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default YourInactiveThought;