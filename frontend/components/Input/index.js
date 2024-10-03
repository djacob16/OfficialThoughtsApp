import { View, Text, TextInput, Image } from "react-native";
import emailIcon from "../../assets/Envelope.png";
import styles from "./styles";

const Input = ({ title, setEmail, setPassword, setConfirmPassword }) => {
    return (
        <View>
            {title === "Email" &&
                <View style={styles.textInputContainer}>
                    <Image source={emailIcon} style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        placeholder="Enter your email"
                        placeholderTextColor={"gray"}
                        onChangeText={setEmail}
                        autoFocus={true}
                    />
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
                            autoFocus={true}
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