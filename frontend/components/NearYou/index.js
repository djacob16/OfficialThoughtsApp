import React, { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { useDispatch, useSelector } from "react-redux";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import NearbyThought from "../../components/NearbyThought";
import { Colors } from "../../constants/colors";

const NearYou = ({ hash }) => {
    const dispatch = useDispatch();
    const { nearbyThoughts, loading } = useSelector((state) => state.getNearbyThoughtsSlice);

    // loads nearby thoughts
    useEffect(() => {
        const fetchData = async () => {
            if (hash) {
                const storedThoughts = await AsyncStorage.getItem('nearbyThoughts');
                if (storedThoughts) {
                    console.log("Loaded from AsyncStorage");
                } else {
                    dispatch(getNearbyThoughts(hash));
                }
            }
        };

        fetchData();
    }, [hash]);

    // Store nearbyThoughts in AsyncStorage after loading succeeds
    useEffect(() => {
        if (loading === "succeeded") {
            const storeData = async () => {
                try {
                    await AsyncStorage.setItem('nearbyThoughts', JSON.stringify(nearbyThoughts));
                } catch (error) {
                    console.error("Error storing data in AsyncStorage:", error);
                }
            };

            storeData();
        }
    }, [loading, nearbyThoughts]);

    return (
        <View style={{ flex: 1, marginBottom: 30 }}>
            {loading === "succeeded" ? (
                <FlatList
                    data={nearbyThoughts}
                    keyExtractor={(item, index) => index.toString()}
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
                Array.from({ length: 6 }).map((_, index) => (
                    <View key={index} style={styles.contentLoaderContainer}>
                        <ContentLoader
                            height={70}
                            speed={1}
                            backgroundColor={'#333'}
                            foregroundColor={'#999'}
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
