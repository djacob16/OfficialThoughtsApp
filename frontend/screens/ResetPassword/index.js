import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { confirmResetPassword } from 'aws-amplify/auth';

const ResetPassword = () => {
    const navigation = useNavigation();
    const route = useRoute()
    const { email } = route.params;
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        setError("")
        if (password == confirmPassword) {
            try {
                await confirmResetPassword({ username: email, confirmationCode: code, newPassword: password });
                navigation.navigate("Signin")
            } catch (error) {
                console.log(error);
                setError(error)
            }
        } else {
            setError("Passwords do not match")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Reset password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter code"
                    onChangeText={setCode}
                    value={code}
                    placeholderTextColor={"gray"}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter new password"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={"gray"}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Confirm new password"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholderTextColor={"gray"}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.inputContainer} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ResetPassword;