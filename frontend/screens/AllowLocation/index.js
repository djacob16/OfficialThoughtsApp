import React, { useState, useEffect } from "react";
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import art from "../../assets/introVectorArt.png";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addSnsEndpoint, updateUser } from "../../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import ladyPin from "../../assets/ladyPin.png";
import SignupHeader from "../../components/SignupHeader";

const AllowLocation = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const client = generateClient()

    const setupPushNotifications = async () => {
        try {
            const permissions = await PushNotificationIOS.requestPermissions();
            console.log('Push Notification Permissions:', permissions);

            if (permissions.alert || permissions.badge || permissions.sound) {
                PushNotificationIOS.addEventListener('register', async (token) => {
                    console.log('APNS Device Token:', token)
                    await AsyncStorage.setItem("deviceToken", token);
                    try {
                        await client.graphql({
                            query: updateUser,
                            variables: {
                                deviceToken: token
                            }
                        })

                        await client.graphql({
                            query: addSnsEndpoint,
                            variables: {
                                deviceToken: token
                            }
                        })
                    } catch (error) {
                        console.log("error getting location/notificatoin: ", error)
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
        <View style={styles.container} >
            <SignupHeader title={"Permissions"} />
            <Text style={styles.title}>Allow location & notifications</Text>
            <Image source={ladyPin} style={styles.art} />
            <Text style={styles.subTitle}>In order to get the most out of this app you should to allow location and notifications!</Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleLocation}>
                <Text style={styles.next}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AllowLocation;
