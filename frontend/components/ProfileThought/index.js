import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileThought = ({ thought }) => {
    const [track, setTrack] = useState(null)

    useEffect(() => {
        const getSong = async () => {
            const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
            console.log(spotifyAuth)
            if (spotifyAuth && spotifyAuth == "true") {
                const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
                const expiryTime = new Date(expiryString);
                const currentTime = new Date();
                if (currentTime >= expiryTime) {
                    await refreshAccessToken()
                    console.log("NEW access token has been updated")
                }
                const accessToken = await AsyncStorage.getItem("spotifyAccessToken")
                if (thought?.music) {
                    try {
                        const response = await fetch(`https://api.spotify.com/v1/tracks/${thought.music}`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const trackData = await response.json();
                        setTrack(trackData)
                    } catch (error) {
                        console.log("Error: ", error)
                        setLoadingSong(false)
                    }
                }
            } else {
                setTrack(null);
            }
        }
        getSong()
    }, [])

    return (
        <>
            {thought.music && <Image source={{ uri: track?.album?.images[0]?.url }} style={styles.image} />}
            {thought.photo && <Image source={{ uri: thought.photo }} style={styles.image} />}
            {!thought.photo && !thought.music && !track && <View style={styles.textContainer}>
                <Text style={styles.content}>{thought.content}</Text>
            </View>}
        </>
    )
}

export default ProfileThought;