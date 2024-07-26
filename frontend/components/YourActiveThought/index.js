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
import { useSelector } from "react-redux";
import deleteOneThought from "../../data/deleteOneThought";

const YourActiveThought = ({ activeThought }) => {
    const navigation = useNavigation();
    const [displayName, setDisplayName] = useState("");
    const user = useSelector((state) => state.userSlice.user);

    const edit = () => {
        navigation.navigate("EditThought", { activeThought })
    }

    const deleteFunc = () => {
        deleteOneThought(activeThought.id);
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.profileContainer}></View>
                <View style={styles.thoughtBody}>
                    <View style={styles.userInfo}>
                        {activeThought.anonymous ? (
                            <Text style={styles.userName}>Anonymous</Text>
                        ) : (
                            <Text style={styles.userName}>{user?.displayName}</Text>
                        )}
                        <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                    </View>
                    <View style={styles.thoughtContent}>
                        <Text style={styles.content}>
                            {activeThought.content}
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
                        <TouchableOpacity style={styles.interactionNumber} onPress={edit}>
                            <Image source={pencilIcon} style={styles.pencilIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.thoughtControllers}>
                <TouchableOpacity onPress={edit}>
                    <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteFunc}>
                    <Image source={trasIcon} style={styles.controllerIcons} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default YourActiveThought;