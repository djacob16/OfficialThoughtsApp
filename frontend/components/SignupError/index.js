import { View, Text } from "react-native";
import styles from "./styles";

const SignupError = ({ title, exists, validEmail, email, passwordsAreTheSame }) => {
    return (
        <View>
            {title === "Email" && exists && <Text style={styles.error}>Email already exists</Text>}
            {title === "Email" && !validEmail && email.length > 0 && !exists && <Text style={styles.error}>Email is invalid</Text>}
            {title === "Password" && !passwordsAreTheSame && <Text style={styles.error}>Passwords are not the same</Text>}
        </View>
    )
}

export default SignupError;