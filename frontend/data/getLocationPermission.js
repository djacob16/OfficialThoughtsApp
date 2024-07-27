import * as Location from 'expo-location';

const getLocationPermission = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        return currentLocation;
    } catch (error) {
        console.log('Error getting location:', error);
    }
};

export default getLocationPermission;