import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import backArrow from "../../assets/chevron-left.png"

const SignupHeader = ({ title }) => {
    const navigation = useNavigation();

    const toScreen = () => {
        if (title === "Email") {
            navigation.navigate("Signin")
        }
        if (title === "Password") {
            navigation.navigate("EmailScreen")
        }
        if (title === "Name") {
            navigation.navigate("PasswordScreen")
        }
        if (title === "Username") {
            navigation.navigate("NameScreen")
        }
        if (title === "Allow Location") {
            navigation.navigate("UsernameScreen");
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 30, justifyContent: "center" }}>
                <TouchableOpacity onPress={toScreen} style={styles.backArrowContainer}>
                    <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={styles.createAccountContainer}>
                    <Text style={styles.createAccount}>Create Account</Text>
                </View>
            </View>
            {title === "Email" && <Text style={styles.subtitle}>What's your email?</Text>}
            {title === "Password" && <Text style={styles.subtitle}>Create a password</Text>}
        </View>
    )
}

export default SignupHeader