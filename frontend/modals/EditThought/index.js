import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import editOneThought from "../../data/editOneThought";
import styles from "./styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import Video from "react-native-video";
import formatDate from "../../data/formatDate";
import defaultProfilePic from "../../assets/defaultprofilepic.png"

const EditThought = () => {
    const route = useRoute();
    const { activeThought } = route.params;
    const [content, setContent] = useState(activeThought.content);
    const [image, setImage] = useState(activeThought.photo ? activeThought.photo : null);
    const [active, setActive] = useState(activeThought.active);
    const [parked, setParked] = useState(activeThought.parked);
    const [anonymous, setAnonymous] = useState(activeThought.anonymous);
    const navigation = useNavigation();

    const edit = () => {
        editOneThought(activeThought.id, content, active, parked, anonymous);
        navigation.navigate("Main");
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancelText}>cancel</Text></TouchableOpacity>
                    <Text style={styles.headerText}>Edit thought</Text>
                    <Text>        </Text>
                </View>

                <ScrollView style={styles.bodyContainer}>
                    <View style={styles.editContainer}>
                        <View style={styles.profileContainer}>
                            {activeThought?.author?.photo ? (
                                <Image source={{ uri: activeThought.author.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                            ) : (
                                <Image source={defaultProfilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
                            )}
                        </View>
                        <View style={styles.thoughtBody}>
                            <View style={styles.userInfo}>
                                {activeThought.anonymous ? (
                                    <Text style={styles.userName}>Anonymous</Text>
                                ) : (
                                    <Text style={styles.userName}>{activeThought?.author?.displayName}</Text>
                                )}
                                <Text style={styles.time}>{formatDate(activeThought.createdAt)}</Text>
                            </View>
                            <View style={styles.thoughtContent}>
                                <TextInput
                                    value={content}
                                    style={styles.input}
                                    onChangeText={setContent}
                                    multiline={true}
                                    autoFocus={true}
                                />
                                {activeThought.photo?.slice(-4) === ".jpg" &&
                                    <Image source={{ uri: activeThought.photo }} style={styles.photo} />
                                }
                                {activeThought.photo?.slice(-4) === ".mp4" &&
                                    <Video source={{ uri: activeThought.photo }} resizeMode="contain" controls={true} style={styles.video} />
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.editButtonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={edit}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditThought;
