import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import geohash from 'ngeohash';
import { locationSubscription } from '../utils/locationSubscription';

let subscription = null;

const getLocation = async () => {
    try {
        const storedPermission = await AsyncStorage.getItem('@location_permission');
        const storedHash = await AsyncStorage.getItem('@hash')

        console.log("storedPermission: ", storedPermission)
        console.log("storedHash: ", storedHash)

        // only for first time users
        if (storedPermission || storedHash == null) {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
                if (newStatus !== 'granted') {
                    console.log("Permission to access location was denied");
                    // stop subscription
                    if (subscription) {
                        subscription.remove();
                        subscription = null;
                        console.log("location subscription stopped")
                    }
                    return "Permission to access location was denied";
                } else {
                    await AsyncStorage.setItem('@location_permission', 'granted');
                    let currentLocation = await Location.getCurrentPositionAsync({});
                    await AsyncStorage.setItem('@hash', geohash.encode(currentLocation.coords.latitude, currentLocation.coords.longitude, 9));
                    // start subscription
                    subscription = await locationSubscription();
                    console.log("location subscription started")
                }
            }
            await AsyncStorage.setItem('@location_permission', 'granted');
        }
        subscription = await locationSubscription();
        console.log("location subscription started")
        let currentLocation = await Location.getCurrentPositionAsync({});
        await AsyncStorage.setItem('@hash', geohash.encode(currentLocation.coords.latitude, currentLocation.coords.longitude, 9));
        return currentLocation;
    } catch (error) {
        console.log("Error getting location:", error);
        // stop subscription
        if (subscription) {
            subscription.remove();
            subscription = null;
            console.log("location subscription stopped")
        }
        return null;
    }
}

export default getLocation;