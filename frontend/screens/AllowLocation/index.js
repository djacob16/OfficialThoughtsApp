import React, { useState, useEffect } from "react";
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import art from "../../assets/introVectorArt.png";
import { getNearbyThoughts, resetNearbyThoughts } from "../../slices/getNearbyThoughts";
import { useDispatch } from "react-redux";
import geohash from "ngeohash";

const AllowLocation = () => {
    const [location, setLocation] = useState([])
    const [hash, setHash] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation();


    const handleLocation = async () => {
        setLoading(true)
        try {
            const loc = await getLocation();
            setLocation([loc.coords.longitude, loc.coords.latitude]);
            setHash(geohash.encode(loc.coords.latitude, loc.coords.longitude, 9));
            if (hash) {
                dispatch(getNearbyThoughts(hash));
            }
            navigation.navigate("Main")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    console.log("location: ", location);
    console.log("hash: ", hash);

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
