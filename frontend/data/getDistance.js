import ngeohash from 'ngeohash';
import AsyncStorage from '@react-native-async-storage/async-storage';
const geolib = require('geolib');

export const getDistance = async (thoughtHash) => {
    const userHash = await AsyncStorage.getItem("@hash");

    const { latitude: userLat, longitude: userLon } = ngeohash.decode(userHash);
    const { latitude: thoughtLat, longitude: thoughtLon } = ngeohash.decode(thoughtHash);

    // Calculate the distance
    const distance = geolib.getDistance(
        { latitude: userLat, longitude: userLon },
        { latitude: thoughtLat, longitude: thoughtLon }
    );

    console.log(`Distance: ${distance} meters`);
    console.log("thought: ", thoughtHash)
    console.log("user: ", userHash)
}