// import React, { useEffect, useState } from "react";
// import { View, Text, Image } from "react-native";
// import FastImage from "react-native-fast-image";
// import styles from "./styles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import logo from "../../assets/icon.png"
// import { refreshAccessToken } from "../../data/exchangeCodeForToken";
// import formatDate from "../../data/formatDate";

// const LikeItem = ({ item }) => {
//     const [trackPic, setTrackPic] = useState("")
//     const [spotifyAuth, setSpotifyAuth] = useState(true)
//     const [loadingPic, setLoadingPic] = useState(false)

//     useEffect(() => {
//         const getSong = async () => {
//             const spotifyAuth = await AsyncStorage.getItem("spotifyAuth")
//             if (spotifyAuth && spotifyAuth == "true") {
//                 setSpotifyAuth(true)
//                 setLoadingPic(true)
//                 const expiryString = await AsyncStorage.getItem('spotifyTokenExpiry');
//                 const expiryTime = new Date(expiryString);
//                 const currentTime = new Date();
//                 if (currentTime >= expiryTime) {
//                     await refreshAccessToken()
//                     console.log("NEW access token has been updated")
//                 }
//                 const accessToken = await AsyncStorage.getItem("spotifyAccessToken")
//                 try {
//                     const response = await fetch(`https://api.spotify.com/v1/tracks/${item.thought.music}`, {
//                         headers: {
//                             'Authorization': `Bearer ${accessToken}`
//                         }
//                     });

//                     if (!response.ok) {
//                         setSpotifyAuth(true)
//                         throw new Error(`HTTP error! status: ${response.status}`);
//                     }

//                     const trackData = await response.json();
//                     setTrackPic(trackData?.album?.images[0]?.url)
//                     setLoadingPic(false)
//                 } catch (error) {
//                     console.log("Error: ", error)
//                     setLoadingSong(false)
//                 }
//             }
//         }
//         if (item.thought.music) {
//             getSong()
//         }
//     }, [])

//     return (
//         <View style={styles.container}>
//             <View style={styles.profileContainer}>
//                 <FastImage source={{ uri: item?.user?.photo }} style={{ width: 40, height: 40, borderRadius: 20 }} />
//             </View>
//             <View style={styles.midContainer}>
//                 {item?.thought?.likes > 2 ? (
//                     <Text style={styles.likedText}>
//                         <Text style={styles.likedTextBold}>{item?.user?.displayName}</Text> and {item?.thought?.likes - 1} others liked your thought
//                     </Text>
//                 ) : (
//                     <Text style={styles.likedText}>
//                         <Text style={styles.likedTextBold}>{item?.user?.displayName}</Text> liked your thought

//                     </Text>
//                 )}
//                 {item?.thought?.content && (
//                     <Text style={styles.contentText}>
//                         {item.thought.content.length > 50
//                             ? `"${item.thought.content.substring(0, 50)}..."`
//                             : `"${item.thought.content}"`
//                         }
//                     </Text>
//                 )}
//                 <Text style={styles.date}>{formatDate(item.createdAt)} ago</Text>
//             </View>
//             <View style={styles.optionalPhotoContainer}>
//                 {item?.thought?.music && trackPic ? (
//                     <Image source={{ uri: trackPic }} style={{ width: 50, height: 50, borderRadius: 8 }} />
//                 ) : item?.thought?.photo ? (
//                     <Image source={{ uri: item?.thought?.photo }} style={{ width: 50, height: 50, borderRadius: 8 }} />
//                 ) : (
//                     <Image source={logo} style={{ width: 50, height: 50, borderRadius: 8 }} />
//                 )}
//             </View>
//         </View>
//     );
// };

// export default LikeItem;
