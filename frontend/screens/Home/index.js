import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { signOut } from "aws-amplify/auth";

const Home = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => signOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;