import axios from 'axios';

const key = "AIzaSyDb4oc7UIFvkTnmEbQ6W-5rrz58EVFNggo";

export const reverseGeocode = async (lat, lon) => {
    try {
        if (lat & lon) {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`
            )
            const location = response?.data?.results?.find(location => location.types.includes('premise'));
            if (!location) {
                return response?.data?.results[0]?.formatted_address;
            }
            return location.formatted_address;
        }
    } catch (error) {
        console.log("error trying to reverse coordinates");
    }

}