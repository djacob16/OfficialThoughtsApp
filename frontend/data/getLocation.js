import * as Location from 'expo-location';

const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error("Permission to access location was denied");
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        return currentLocation;
    } catch (error) {
        console.error("Error getting location:", error);
    }
}

export default getLocation;