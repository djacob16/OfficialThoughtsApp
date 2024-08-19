import React, { useState, useEffect } from "react";
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import art from "../../assets/introVectorArt.png";

const AllowLocation = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const handleLocation = async () => {
        try {
            setLoading(true)
            await getLocation();
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
