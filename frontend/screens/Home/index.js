import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleSignOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;