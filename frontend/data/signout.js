import { signOut } from "@aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import { resetUser } from "../slices/getOneUser";
import { resetActiveThoughts } from "../slices/getActiveThoughts";
import { resetInactiveThoughts } from "../slices/getInactiveThoughts";
import { resetNearbyThoughts } from "../slices/getNearbyThoughts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { stopLocationSubscription } from "../utils/locationSubscription";

const useSignOut = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const signout = async () => {
        try {
            await signOut();
            navigation.navigate("Signin");
            await AsyncStorage.setItem("recentUsers", JSON.stringify([]));
            await AsyncStorage.setItem("@hash", "");
            await AsyncStorage.setItem("@location_permission", "");
            await stopLocationSubscription()

            // Reset the state
            dispatch(resetUser());
            dispatch(resetActiveThoughts());
            dispatch(resetInactiveThoughts());
            dispatch(resetNearbyThoughts());
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return { signout };
};

export default useSignOut;
