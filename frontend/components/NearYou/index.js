import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import heart from '../../assets/heartIcon.png';
import * as Location from 'expo-location';
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { useDispatch, useSelector } from "react-redux";

const NearYou = ({ setRefreshing }) => {
    const [location, setLocation] = useState([]);
    const dispatch = useDispatch();

    const getLoc = async () => {
        const loc = await getLocation();
        setLocation([loc.coords.longitude, loc.coords.latitude]);
    }


    const { nearbyThoughts } = useSelector((state) => state.getNearbyThoughtsSlice);

    return (
        <View>
            {nearbyThoughts.map((thought, index) => (
                <View key={index} style={styles.container}>

                </View>
            ))}

            {/* <View style={styles.container}>
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
                            <Text style={styles.content}>{activeThought.content}</Text>
                        </View>
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
                    <TouchableOpacity onPress={toggleActiveStatus}>
                        <Image source={lightBulbFillIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteFunc}>
                        <Image source={trasIcon} style={styles.controllerIcons} />
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
};

export default NearYou;
