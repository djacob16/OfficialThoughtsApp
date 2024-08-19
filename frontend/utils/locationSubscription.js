import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import geohash from 'ngeohash';
import { updateActiveUnparkedThoughts } from '../data/updateActiveUnparkedThoughts';

let locationSubscription = null;

const updateLocationOfThoughts = async () => {
    const newHash = await AsyncStorage.getItem('@hash');
    if (newHash) {
        await updateActiveUnparkedThoughts(newHash);
    }
};

export const startLocationSubscription = async () => {
    if (locationSubscription) return; // Already tracking

    locationSubscription = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 100,
        },
        (location) => {
            console.log("Updated location: ", location);
            const newHash = geohash.encode(location.coords.latitude, location.coords.longitude, 9);
            AsyncStorage.setItem('@hash', newHash)
                .catch(err => console.error('Error saving location hash:', err));
            updateLocationOfThoughts();
        }
    );
};

export const stopLocationSubscription = async () => {
    if (locationSubscription) {
        await locationSubscription.remove();
        locationSubscription = null;
    }
};