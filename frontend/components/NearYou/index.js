import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { useDispatch, useSelector } from "react-redux";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import NearbyThought from "../../components/NearbyThought";
import { Colors } from "../../constants/colors";
import getLocation from "../../data/getLocation";

const NearYou = () => {
    const dispatch = useDispatch();
    const { nearbyThoughts: reduxNearbyThoughts, loading } = useSelector((state) => state.getNearbyThoughtsSlice);
    const [nearbyThoughts, setNearbyThoughts] = useState([]);

    // loads nearby thoughts
    useEffect(() => {
        const fetchData = async () => {
            const storedHash = await AsyncStorage.getItem('@hash');
            console.log("USER HASH: ", storedHash)
            if (!storedHash) {
                await getLocation();
                const newStoredHash = await AsyncStorage.getItem('@hash');
                if (newStoredHash) {
                    dispatch(getNearbyThoughts(newStoredHash));
                }
            } else {
                const storedThoughts = await AsyncStorage.getItem('nearbyThoughts');
                if (storedThoughts) {
                    console.log("Loaded from AsyncStorage");
                    setNearbyThoughts(JSON.parse(storedThoughts));
                } else {
                    dispatch(getNearbyThoughts(storedHash));
                }
            }
        };

        fetchData();
    }, []);

    // Store nearbyThoughts in AsyncStorage after loading succeeds
    // useEffect(() => {
    //     if (loading === "succeeded") {
    //         setNearbyThoughts(reduxNearbyThoughts);
    //         const storeData = async () => {
    //             try {
    //                 await AsyncStorage.setItem('nearbyThoughts', JSON.stringify(reduxNearbyThoughts));
    //                 console.log("async storage has been updated with new thoughts")
    //             } catch (error) {
    //                 console.error("Error storing data in AsyncStorage:", error);
    //             }
    //         };

    //         storeData();
    //     }
    // }, [loading, reduxNearbyThoughts]);

    console.log(loading)


    return (
        <View style={{ flex: 1, marginBottom: 30, zIndex: -1 }}>
            {loading == "succeeded" ? (
                reduxNearbyThoughts.length > 0 ? (
                    <FlatList
                        data={reduxNearbyThoughts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{
                                borderBottomWidth: .5,
                                borderBottomColor: Colors.lightGray,
                                marginBottom: 12
                            }}>
                                <NearbyThought thought={item} />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
                        No nearby thoughts. Walk around to discover more!
                    </Text>
                )
            ) : (
                Array.from({ length: 6 }).map((_, index) => (
                    <View key={index} style={styles.contentLoaderContainer}>
                        <ContentLoader
                            height={75}
                            speed={1}
                            backgroundColor={'#333'}
                            foregroundColor={'#211F1F'}
                            viewBox="0 0 380 70"
                        >
                            <Circle cx="30" cy="30" r="30" />
                            <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                            <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                        </ContentLoader>
                    </View>
                ))
            )}
        </View>
    );
};

export default NearYou;