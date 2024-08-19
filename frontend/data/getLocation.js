import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import geohash from 'ngeohash';
import { startLocationSubscription, stopLocationSubscription } from '../utils/locationSubscription';

const getLocation = async () => {
    try {
        let { status: permissionStatus } = await Location.getForegroundPermissionsAsync();

        if (permissionStatus !== 'granted') {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permission to access location was denied");
                await AsyncStorage.setItem('@location_permission', 'denied');
                await AsyncStorage.setItem('@hash', null);
                stopLocationSubscription()
                return "Permission to access location was denied";
            } else {
                await AsyncStorage.setItem('@location_permission', 'granted');
                const currentLocation = await Location.getCurrentPositionAsync({});
                const hash = geohash.encode(currentLocation.coords.latitude, currentLocation.coords.longitude, 9);
                await AsyncStorage.setItem('@hash', hash);
                await startLocationSubscription()
                console.log("first time users now have location enabled in asyn storage and subscription started")
                return currentLocation;
            }
        } else {
            await AsyncStorage.setItem('@location_permission', 'granted');
            const currentLocation = await Location.getCurrentPositionAsync({});
            const hash = geohash.encode(currentLocation.coords.latitude, currentLocation.coords.longitude, 9);
            await AsyncStorage.setItem('@hash', hash);
            await startLocationSubscription()
            return currentLocation;
        }
    } catch (error) {
        console.log("Error getting location:", error);
        await stopLocationSubscription()
        return null;
    }
};

export default getLocation





























