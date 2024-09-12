import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Linking, Animated, Dimensions, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import playIcon from "../../assets/play.circle.png";
import pauseIcon from "../../assets/pause.circle.fill.png";
import spotifyLogo from "../../assets/spotifyLogo.png"
import searchIcon from "../../assets/search.png";
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import { Colors } from "../../constants/colors";
import { Audio } from 'expo-av';
import styles from "./style";

const Music = ({ setTrack }) => {
    // general
    const [spotifyAuth, setSpotifyAuth] = useState(true)
    const navigation = useNavigation()
    const [spotifyUserId, setSpotifyUserId] = useState("")
    // music states
    const [tracks, setTracks] = useState([]);
    const [trendingTracks, setTrendingTracks] = useState([]);
    const [sound, setSound] = useState(null);
    const [playingTrackId, setPlayingTrackId] = useState(null);
    const [confirmTrack, setConfirmTrack] = useState(null);
    const [confirmTrackId, setConfirmTrackId] = useState(null);
    // loading states
    const [loadingTracks, setLoadingTracks] = useState(false)
    // navigator/animation states
    const windowWidth = Dimensions.get('window').width;
    const [title, setTitle] = useState("Recommended");
    const [titleId, setTitleId] = useState("1");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    //search
    const [isTextInputFocused, setTextInputFocused] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef(null);

    //navigator & animations
    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        if (sound) {
            sound.unloadAsync();
            setPlayingTrackId(null);
            setConfirmTrack(null)
            setConfirmTrackId(null)
        }
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    };
    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [windowWidth * .02, windowWidth * .52]
                })
            }
        ]
    };
    const musicCategories = [
        {
            id: "1",
            title: "Recommended"
        },
        {
            id: "2",
            title: "Trending"
        }
    ]
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

    // load data
    useEffect(() => {
        const fetchData = async () => {
            const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
            if (spotifyAuth && spotifyAuth == "true") {
                try {
                    setLoadingTracks(true)
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
                    setTracks(await getTopTracks(accessToken));
                    const trendingTracks = await getTrendingTracks(accessToken)
                    setTrendingTracks(trendingTracks);
                    setSpotifyUserId(await getUserId(accessToken));
                    setLoadingTracks(false)
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

    // clean up
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
                setPlayingTrackId(null);
            }
        };
    }, [sound]);

    // play/pause controls
    const playPreview = async (previewUrl, track) => {
        if (track.preview_url) {
            try {
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
                console.log(`Playing track: ${track.id}`);

                setPlayingTrackId(track.id);
                setConfirmTrackId(track.id)
                setConfirmTrack(track)

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        console.log(`Track ${track.id} finished playing.`);
                        setPlayingTrackId(null);
                    }
                });

            } catch (error) {
                console.error(`Error playing preview for track ${track.id}:`, error);
                setPlayingTrackId(null);
            }
        } else {
            if (track.id == playingTrackId) {
                setPlayingTrackId(null);
                setConfirmTrackId(null)
                setConfirmTrack(null)
            } else {
                if (sound) {
                    await sound.unloadAsync();
                    setSound(null);
                }
                setPlayingTrackId(track.id);
                setConfirmTrackId(track.id)
                setConfirmTrack(track)
            }
        }
        console.log("played")

    };
    const pausePreview = async (track) => {
        if (sound) {
            await sound.pauseAsync();
        }
        setPlayingTrackId(null);
        setConfirmTrackId(null)
        setConfirmTrack(null)
        console.log("paused")
    };



    // FETCH data from spotify
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
                console.log("YOUR TOP TRACKSSS: ", data.items)
                return data.items;
            } else {
                console.log("No tracks found in the response");
                return [];
            }
        } catch (error) {
            console.log("Error getting top tracks: ", error);
            return [];
        }
    }
    async function getTrendingTracks(accessToken) {
        // American classics: 1hMWKgzWvIi5VZ8kOdIduH
        // Top 50: 37i9dQZF1DXcBWIGoYBM5M
        // 2000s pop: 6j4w1woXd7xzGCNQoKrpY9
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                console.log("Error getting pop tracks here: ", response.statusText);
                return [];
            }

            const data = await response.json();
            if (data && data.items) {
                console.log(data.items);
                return data.items;
            } else {
                console.log("No tracks found in the response");
                return [];
            }
        } catch (error) {
            console.log("Error getting trending tracks: ", error);
            return [];
        }
    }
    useEffect(() => {
        if (searchInput.length > 0) {
            const search = async () => {
                const accessToken = await AsyncStorage.getItem("spotifyAccessToken");
                const results = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!results.ok) {
                    console.error("Error fetching search results: ", results.statusText);
                    return [];
                }
                const data = await results.json();
                setSearchResults(data.tracks.items);
            };
            search();
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);


    // helper functions
    const share = () => {
        if (confirmTrack) {
            setTrack(confirmTrack)
            navigation.goBack()
        }
    }
    const handleTextInputFocus = async () => {
        setTextInputFocused(true);
        if (sound) {
            sound.unloadAsync();
            setPlayingTrackId(null);
            setConfirmTrack(null)
            setConfirmTrackId(null)
        }
    };

    const handleTextCancel = () => {
        if (sound) {
            sound.unloadAsync();
            setPlayingTrackId(null);
            setConfirmTrack(null)
            setConfirmTrackId(null)
        }
        setTextInputFocused(false);
        setSearchInput("");
        setSearchResults([]);
        searchRef.current?.blur();
    };

    return (
        <View style={styles.container}>
            {spotifyAuth ? (
                <View style={{ paddingBottom: 50 }}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchInputContainer}>
                            <View style={styles.textInputContainer}>
                                <Image source={searchIcon} style={styles.searchIcon} />
                                <TextInput
                                    placeholderTextColor={"#959595"}
                                    ref={searchRef}
                                    value={searchInput}
                                    autoCapitalize={"none"}
                                    autoFocus={isTextInputFocused}
                                    placeholder={"Search"}
                                    style={isTextInputFocused ? styles.textInputFocused : styles.input}
                                    onFocus={handleTextInputFocus}
                                    onChangeText={setSearchInput}
                                />
                            </View>
                            {isTextInputFocused && (
                                <TouchableOpacity onPress={handleTextCancel}>
                                    <Text style={{ color: "white" }}>Cancel</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {!isTextInputFocused && <View style={styles.navigator}>
                        <Animated.View style={[styles.highlight, highlightStyle]} />
                        {musicCategories.map((data, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => titleIdFunc(data.id, data.title)}
                                style={styles.navigatorText}
                            >
                                <Text style={{ color: data.id === titleId ? "white" : "gray" }}>
                                    {data.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>}
                    {isTextInputFocused &&
                        <View>
                            {!loadingTracks ? (
                                <FlatList
                                    data={searchResults}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={[item.id == confirmTrackId ? styles.trackContainerHighlighted : styles.trackContainer]} onPress={playingTrackId == item.id ? () => pausePreview(item) : () => playPreview(item.preview_url, item)}>
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
                                                            playPreview(item.preview_url, item);
                                                        }
                                                    }}
                                                    style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
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
                                    ListFooterComponent={<View style={{ height: 200 }} />}
                                />
                            ) : (
                                <ActivityIndicator style={{ paddingTop: 60 }} size={"large"} />
                            )}
                        </View>
                    }
                    {title == "Recommended" && !isTextInputFocused &&
                        <View style={{ marginBottom: 10 }}>
                            {!loadingTracks ? (
                                <FlatList
                                    data={tracks}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={[item.id == confirmTrackId ? styles.trackContainerHighlighted : styles.trackContainer]} onPress={playingTrackId == item.id ? () => pausePreview(item) : () => playPreview(item.preview_url, item)}>
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
                                                            playPreview(item.preview_url, item);
                                                        }
                                                    }}
                                                    style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
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
                                    style={{ paddingTop: 20 }}
                                    ListFooterComponent={<View style={{ height: 200 }} />}
                                />
                            ) : (
                                <ActivityIndicator style={{ paddingTop: 60 }} size={"large"} />
                            )}
                        </View>
                    }

                    {title == "Trending" && !isTextInputFocused &&
                        <View>
                            {!loadingTracks ? (
                                <FlatList
                                    data={trendingTracks.filter(item => item.track.preview_url !== null)}
                                    keyExtractor={(item) => item.track.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={[item.track.id == confirmTrackId ? styles.trackContainerHighlighted : styles.trackContainer]} onPress={playingTrackId == item.track.id ? () => pausePreview(item.track) : () => playPreview(item.track.preview_url, item.track)}>
                                            <Image source={{ uri: item?.track?.album?.images[0]?.url }} resizeMode="cover" style={{ width: 55, height: 55, borderRadius: 5 }} />
                                            <View style={styles.trackInfoContainer}>
                                                <Text style={styles.trackTitle}>{item.track.name}</Text>
                                                <Text style={styles.artistTitle}>- {item.track.artists.map(artist => artist.name).join(', ')}</Text>
                                            </View>
                                            {item.track.preview_url ? (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (playingTrackId == item.track.id) {
                                                            pausePreview();
                                                        } else {
                                                            playPreview(item.track.preview_url, item.track);
                                                        }
                                                    }}
                                                >
                                                    <Image
                                                        source={playingTrackId == item.track.id ? pauseIcon : playIcon}
                                                        style={{ width: 44, height: 44 }}
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1 }} onPress={() => { Linking.openURL(item.track.external_urls.spotify) }}>
                                                    <Image source={spotifyLogo} style={{ width: 30, height: 30 }} />
                                                </TouchableOpacity>
                                            )
                                            }
                                        </TouchableOpacity>
                                    )}
                                    style={{ paddingTop: 20 }}
                                    ListFooterComponent={<View style={{ height: 200 }} />}
                                />
                            ) : (
                                <ActivityIndicator style={{ paddingTop: 60 }} size={"large"} />
                            )}
                        </View>
                    }

                    {confirmTrackId && (
                        <Animated.View style={{ position: "absolute", bottom: 75, left: 0, right: 0, alignItems: "center", justifyContent: "center" }}>
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
                </View>
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
