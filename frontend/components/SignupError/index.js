import { View, Text } from "react-native";
import styles from "./styles";

const SignupError = ({ title, emailError, passwordError, nameError, usernameError }) => {
    return (
        <View>
            {title === "Email" && <Text style={styles.error}>{emailError}</Text>}
            {title === "Password" && <Text style={styles.error}>{passwordError}</Text>}
            {title === "Name" && <Text style={styles.error}>{nameError}</Text>}
            {title === "Username" && <Text style={styles.error}>{usernameError}</Text>}
        </View>
    )
}

export default SignupError;