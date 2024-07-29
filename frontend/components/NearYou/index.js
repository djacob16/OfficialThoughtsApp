import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import heart from '../../assets/heartIcon.png';
import * as Location from 'expo-location';
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png"
import parkedIcon from "../../assets/mappinParked.png"

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
                    <View>
                        <View style={styles.profileContainer}></View>
                        <View style={styles.thoughtBody}>
                            <View style={styles.userInfo}>
                                {thought.anonymous ? (
                                    <Text style={styles.userName}>Anonymous</Text>
                                ) : (
                                    <Text style={styles.userName}>{thought?.author?.displayName}</Text>
                                )}
                                <Text style={styles.time}>{formatDate(thought.createdAt)}</Text>
                            </View>
                            <View style={styles.thoughtContent}>
                                <Text style={styles.content}>{thought.content}</Text>
                            </View>
                            <View style={styles.thoughtTags}>
                                <Text style={styles.tags}>Be the first to leave a label</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.thoughtInteractions}>
                            <TouchableOpacity style={styles.interactionNumber}>
                                <Image source={heartIcon} style={styles.icon} />
                                <Text style={styles.number}>{thought.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.interactionNumber}>
                                <Image source={commentIcon} style={styles.icon} />
                                <Text style={styles.number}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={shareIcon} style={styles.icon} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.parkedDistanceContainer}>
                        {thought.parked && (
                            <View style={styles.parkedDistance}>
                                <Image style={styles.parkedIcon} source={parkedIcon} />
                                <Text style={styles.parkedText}>15</Text>
                            </View>
                        )}
                        <TouchableOpacity>
                            <Image source={threeDots} style={styles.threeDotsIcon} />
                        </TouchableOpacity>
                    </View>
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
