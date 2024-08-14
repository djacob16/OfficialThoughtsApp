import * as Location from 'expo-location';

const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
            let currentLocation = await Location.getCurrentPositionAsync({});
            return currentLocation;
        } else {
            console.log("Permission to access location was denied");
            return "Permission to access location was denied";
        }
    } catch (error) {
        console.log("Error getting location:", error);
    }
}

export default getLocation;