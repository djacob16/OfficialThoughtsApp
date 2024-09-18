import React, { useState, useEffect } from "react";
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import art from "../../assets/introVectorArt.png";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllowLocation = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const setupPushNotifications = async () => {
        try {
            const permissions = await PushNotificationIOS.requestPermissions();
            console.log('Push Notification Permissions:', permissions);

            if (permissions.alert || permissions.badge || permissions.sound) {
                PushNotificationIOS.addEventListener('register', async (token) => {
                    console.log('APNS Device Token:', token);

                    try {
                        await AsyncStorage.setItem("deviceToken", token);
                        console.log('Device token saved to AsyncStorage');
                    } catch (error) {
                        console.error('Failed to save device token to AsyncStorage:', error);
                    }
                });
            } else {
                console.log('Push notification permission not granted.');
            }
        } catch (error) {
            console.log('Error requesting push notification permission:', error);
        }

        return () => {
            PushNotificationIOS.removeEventListener('register');
        };
    };

    const handleLocation = async () => {
        try {
            setLoading(true)
            await getLocation();
            await setupPushNotifications()
            navigation.navigate("Main")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={art} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>In order to get the most out of this app you need to allow location</Text>
            <TouchableOpacity style={styles.locationButton} onPress={handleLocation}>
                <Text style={styles.buttonText}>{loading ? "Getting location..." : "Allow location"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AllowLocation;
