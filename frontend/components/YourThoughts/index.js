import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import YourActiveThought from '../YourActiveThought';
import { getActiveThoughts } from '../../slices/getActiveThoughts';
import { getInactiveThoughts } from '../../slices/getInactiveThoughts';
import YourInactiveThought from '../YourInactiveThought';
import { Colors } from '../../constants/colors';
import minusIcon from "../../assets/minus-circle.png";
import pencilIcon from "../../assets/pencil-create.png";
import trasIcon from "../../assets/trash.png";
import lightBulbFillIcon from "../../assets/lightbulbFill.png";
import deleteOneThought from '../../data/deleteOneThought';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { useNavigation } from "@react-navigation/native";
import editOneThought from '../../data/editOneThought';

const YourThoughts = ({ scrollY }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [optionsModal, setOptionsModal] = useState(false);
    const [selectedThought, setSelectedThought] = useState(null);
    const { height, width } = Dimensions.get('window');

    useEffect(() => {
        dispatch(getActiveThoughts());
        dispatch(getInactiveThoughts())
    }, [dispatch])

    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    const { inactiveThoughts } = useSelector((state) => state.getInactiveThoughtsSlice);

    const openOptionsModal = (thought) => {
        setSelectedThought(thought); // Set the thought to be edited or acted on
        setOptionsModal(true);
    };

    const handleEdit = () => {
        setOptionsModal(false); // Close the options modal
        navigation.navigate("EditThought", { activeThought: selectedThought }); // Navigate to the edit screen
    };

    const handleDelete = async () => {
        const response = await deleteOneThought(selectedThought.id);
        if (response.status === "success") {
            dispatch(getActiveThoughts());
            setOptionsModal(false)
            Toast.show({
                type: 'success',
                text1: 'Thought deleted successfully!',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error deleting thought',
            });
        }
    }

    const handleToggleActiveStatus = async () => {
        const userHash = await AsyncStorage.getItem('@hash')
        const newActiveStatus = !selectedThought.active;
        await editOneThought(
            selectedThought.id,
            selectedThought.content,
            newActiveStatus,
            selectedThought.parked,
            selectedThought.anonymous
        );
        dispatch(getActiveThoughts());
        dispatch(getInactiveThoughts());
        dispatch(getNearbyThoughts(userHash));
        setOptionsModal(false);
    };

    return (
        <View style={styles.container}>
            {optionsModal && (
                <TouchableWithoutFeedback onPress={() => setOptionsModal(false)}>
                    <Animated.View style={[styles.modalOverlay, { zIndex: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
                        <TouchableWithoutFeedback>
                            <View style={{ position: "absolute", top: scrollY > 20 ? scrollY + 210 : scrollY + 155, width: "100%", height: 335, backgroundColor: "#000000", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                                <View style={styles.optionsHeaderContainer}>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Options</Text>
                                    <TouchableOpacity onPress={() => setOptionsModal(!optionsModal)}><Image source={minusIcon} style={{ width: 24, height: 24 }} /></TouchableOpacity>
                                </View>
                                <View style={styles.optionsContainer}>
                                    <TouchableOpacity style={styles.option} onPress={handleEdit}>
                                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Edit</Text>
                                        <Image style={{ width: 18, height: 18 }} source={pencilIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.option} onPress={handleToggleActiveStatus}>
                                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Toggle active status</Text>
                                        <Image style={{ width: 18, height: 18 }} source={lightBulbFillIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={handleDelete}>
                                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Delete</Text>
                                        <Image style={{ width: 18, height: 19 }} source={trasIcon} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ paddingTop: 10, color: Colors.grayFont }}>Swipe right on thought for quick options</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
            <View style={styles.activeContainer}>
                <Text style={styles.activeTitle}>On my mind</Text>
                <View>
                    {activeThoughts.length === 0 && (
                        <Text style={styles.activeSubText}>
                            Thoughts on your mind are actively seen by others around you
                        </Text>
                    )}
                    {activeThoughts.map((activeThought, index) => (
                        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.lightGray }} key={activeThought.id}>
                            <YourActiveThought activeThought={activeThought} openOptionsModal={openOptionsModal} />
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.inactiveContainer}>
                <Text style={styles.inactiveTitle}>In memory</Text>
                <View style={{ paddingHorizontal: 8 }}>
                    {inactiveThoughts.length === 0 && (
                        <Text style={styles.inactiveSubText}>
                            Thoughts in memory are not actively seen by anyone near you
                        </Text>
                    )}
                    {inactiveThoughts.map((inactiveThought, index) => (
                        <YourInactiveThought key={inactiveThought.id} inactiveThought={inactiveThought} openOptionsModal={openOptionsModal} />
                    ))}
                </View>
            </View>
        </View>
    );
}

export default YourThoughts;
