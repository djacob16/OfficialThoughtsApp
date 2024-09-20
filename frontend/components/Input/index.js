import { View, Text, TextInput } from "react-native";
import styles from "./styles";

const Input = ({ title, setEmail, setPassword, setConfirmPassword }) => {
    return (
        <View>
            {title === "Email" &&
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} autoCapitalize={"none"} placeholder="Enter your email" placeholderTextColor={"gray"} onChangeText={setEmail} />
                </View>
            }
            {title === "Password" && (
                <>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize={"none"}
                            placeholder="Enter your password"
                            placeholderTextColor={"gray"}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Text style={styles.confirmText}>Confirm Your Password</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize={"none"}
                            placeholder="Confirm your password"
                            placeholderTextColor={"gray"}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </>
            )}
        </View >
    )
}

export default Input;