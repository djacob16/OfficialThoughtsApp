import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { makeExchange } from "../../data/exchangeCodeForToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import spotifyLogo from "../../assets/spotifyLogo.png"
import art from "../../assets/introVectorArt.png";
import { useDispatch } from "react-redux";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import { getInactiveThoughts } from "../../slices/getInactiveThoughts";

const ConnectSpotify = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [spotifyAuth, setSpotifyAuth] = useState(false);
    const clientId = '71e9447c39c94c559d7949f70136da52';
    const redirectUri = 'thoughtsapp://callback';
    const scopes = 'user-read-email user-read-private streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played playlist-read-private user-top-read';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    console.log(authUrl)
    const [hash, setHash] = useState("")

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const hash = await AsyncStorage.getItem("@hash")
            if (hash) {
                setHash(hash)
            }
            const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
            if (spotifyAuth && spotifyAuth == "true") {
                setSpotifyAuth(true)
            } else {
                await AsyncStorage.setItem("spotifyAuth", "false")
                setSpotifyAuth(false)
            }
        }
        checkIfLoggedIn()
    }, [])

    const connectToSpotify = async () => {
        try {
            await Linking.openURL(authUrl);
        } catch (error) {
            console.error("Failed to open URL:", error);
        }
    };

    useEffect(() => {
        const handleUrl = async (event) => {
            const { url } = event;
            if (url.startsWith(redirectUri)) {
                const code = new URL(url).searchParams.get('code');
                console.log('Authorization code:', code);
                await AsyncStorage.setItem("spotifyAuth", "true")
                setSpotifyAuth(true)
                await makeExchange(code)
                dispatch(getNearbyThoughts(hash))
                dispatch(getActiveThoughts())
                dispatch(getInactiveThoughts())
            }
        };

        // Add the event listener
        const linkingListener = Linking.addListener('url', handleUrl);

        // Clean up the event listener on component unmount
        return () => {
            linkingListener.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Spotify</Text>
                <Text>        </Text>
            </View>

            <View style={styles.bodyContainer}>
                <Image source={spotifyLogo} style={{ width: 65, height: 65 }} />
                <Image source={art} style={styles.image} resizeMode="contain" />
                <Text style={styles.bodyText}>Connect your Spotify account to discover and share new music with people around you!</Text>
                <TouchableOpacity style={styles.connectButton} onPress={spotifyAuth ? () => { } : connectToSpotify}>
                    <Text style={styles.connectButtonText}>{spotifyAuth ? "Connected" : "Connect to Spotify"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ConnectSpotify;
