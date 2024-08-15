import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocation = async () => {
    try {
        const storedPermission = await AsyncStorage.getItem('@location_permission');

        if (storedPermission !== 'granted') {
            let { status } = await Location.getForegroundPermissionsAsync();

            if (status !== 'granted') {
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
                if (newStatus !== 'granted') {
                    console.log("Permission to access location was denied");
                    return "Permission to access location was denied";
                } else {
                    await AsyncStorage.setItem('@location_permission', 'granted');
                }
            }
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        return currentLocation;
    } catch (error) {
        console.log("Error getting location:", error);
        return null;
    }
}

export default getLocation;