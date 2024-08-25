import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Linking, Animated } from "react-native";
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import playIcon from "../../assets/play.circle.png";
import pauseIcon from "../../assets/pause.circle.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const Music = ({ setTrack }) => {
    const [tracks, setTracks] = useState([]);
    const [sound, setSound] = useState(null);
    const [playingTrackId, setPlayingTrackId] = useState(null);
    const [confirmTrack, setConfirmTrack] = useState(null);
    const [confirmTrackId, setConfirmTrackId] = useState(null);
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(borderColorAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(borderColorAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [borderColorAnim]);

    const borderColorInterpolation = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#1DB954', Colors.lightGray], // Spotify colors
    });

    useEffect(() => {
        const fetchData = async () => {
            const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
            if (spotifyAuth && spotifyAuth == "true") {
                try {
                    const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
                    const expiryTime = new Date(expiryString);
                    const currentTime = new Date();
                    if (currentTime >= expiryTime) {
                        console.log("expired");
                        await refreshAccessToken();
                        console.log("access token has been updated");
                    } else {
                        console.log("not expired");
                    }
                    const accessToken = await AsyncStorage.getItem("spotifyAccessToken");
                    const userId = await getUserId(accessToken);
                    setTracks(await getTopTracks(accessToken));
                    console.log('User ID:', userId);
                } catch (error) {
                    console.error('Error:', error.message);
                }
            } else {
                setSpotifyAuth(false);
                await AsyncStorage.setItem("spotifyAuth", "false")
            }
        };

        fetchData();

        return () => {
            // Cleanup on unmount
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
                setPlayingTrackId(null);
            }
        };
    }, [sound]);

    const playPreview = async (previewUrl, trackId) => {
        try {
            if (playingTrackId === trackId) {
                await pausePreview();
                return;
            }

            setPlayingTrackId(null);

            if (sound) {
                await sound.unloadAsync();
                setSound(null);
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: previewUrl },
                { shouldPlay: false }
            );
            setSound(newSound);

            await newSound.playAsync();
            console.log(`Playing track: ${trackId}`);

            setPlayingTrackId(trackId);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    console.log(`Track ${trackId} finished playing.`);
                    setPlayingTrackId(null);
                }
            });

        } catch (error) {
            console.error(`Error playing preview for track ${trackId}:`, error);
            setPlayingTrackId(null);
        }
    };

    const pausePreview = async () => {
        if (sound) {
            await sound.pauseAsync();
            setPlayingTrackId(null);
        }
    };



    // Function to get user ID
    async function getUserId(accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const text = await response.text();
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return JSON.parse(text);
    }

    // Function to get pop tracks from a playlist
    async function getTopTracks(accessToken) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.log("Error getting pop tracks here: ", response.statusText);
                return [];
            }

            const data = await response.json()
            if (data && data.items) {
                console.log(data.items)
                return data.items;
            } else {
                console.log("No tracks found in the response");
                return [];
            }
        } catch (error) {
            console.log("Error getting pop tracks: ", error);
            return [];
        }
    }

    const select = (item) => {
        setConfirmTrackId(item.id)
        setConfirmTrack(item)
    }

    const share = () => {
        if (confirmTrack) {
            setTrack(confirmTrack)
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            {spotifyAuth ? (
                <>
                    <Text style={{ color: "white" }}>Your top tracks</Text>
                    {tracks.length > 0 ? (
                        <FlatList
                            data={tracks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[item.id == confirmTrackId ? styles.trackContainerHighlighted : styles.trackContainer]} onPress={() => select(item)}>
                                    <Image source={{ uri: item?.album?.images[0]?.url }} resizeMode="cover" style={{ width: 55, height: 55, borderRadius: 5 }} />
                                    <View style={styles.trackInfoContainer}>
                                        <Text style={styles.trackTitle}>{item.name}</Text>
                                        <Text style={styles.artistTitle}>- {item.artists.map(artist => artist.name).join(', ')}</Text>
                                    </View>
                                    {item.preview_url ? (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (playingTrackId == item.id) {
                                                    pausePreview();
                                                } else {
                                                    playPreview(item.preview_url, item.id);
                                                }
                                            }}
                                        >
                                            <Image
                                                source={playingTrackId == item.id ? pauseIcon : playIcon}
                                                style={{ width: 44, height: 44 }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1 }} onPress={() => { Linking.openURL(item.external_urls.spotify) }}>
                                            <Image source={spotifyLogo} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    )
                                    }
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <ActivityIndicator />
                    )}
                    {confirmTrackId && (
                        <Animated.View style={{ position: "absolute", bottom: 25, left: 0, right: 0, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                style={[
                                    styles.confirmButton,
                                    { borderColor: borderColorInterpolation, borderWidth: 2 },
                                ]}
                                onPress={share}
                            >
                                <Text style={styles.confirmText}>Share song</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.connectButton} onPress={() => navigation.navigate("ConnectSpotify")}>
                        <Text style={styles.connectButtonText}>Connect</Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
};

export default Music;
