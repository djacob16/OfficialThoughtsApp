import * as Location from 'expo-location';

const getLocationPermission = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status;
    } catch (error) {
        console.log('Error getting location permission:', error);
    }
};

export default getLocationPermission;