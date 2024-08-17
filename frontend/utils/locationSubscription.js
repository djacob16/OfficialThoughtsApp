import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import geohash from 'ngeohash';

export const locationSubscription = async () => {
    return await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 1220,
        },
        (location) => {
            console.log("updated location: ", location);
            AsyncStorage.setItem('@hash', geohash.encode(location.coords.latitude, location.coords.longitude, 9))
                .catch(err => console.error('Error saving location hash:', err));
        }
    );
}