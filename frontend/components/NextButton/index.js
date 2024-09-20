import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const NextButton = ({ title, exists, validEmail, email, password, confirmPassword }) => {
    const navigation = useNavigation();

    const toNextScreen = () => {
        if (title === "Email" && !exists && validEmail && email.length > 0) {
            navigation.navigate("PasswordScreen", { email })
        }
        if (title === "Password" && password === confirmPassword && password.length >= 8) {
            console.log("next");
        }
    }

    return (
        <>
            {title === "Email" &&
                <TouchableOpacity style={styles.container} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>}
            {title === "Password" && <TouchableOpacity style={styles.container} onPress={toNextScreen}>
                <Text style={styles.next}>Next</Text>
            </TouchableOpacity>}
        </>
    )
}

export default NextButton;