import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { signUp } from 'aws-amplify/auth';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (password === confirmPassword) {
            setError(false);
            try {
                const { isSignUpComplete, userId, nextStep } = await signUp({
                    username: email,
                    password: password,
                    options: {
                        "custom:preferred": username
                    }
                })
                navigation.navigate("Verify", { email })
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setError(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter email"
                    onChangeText={setEmail}
                    value={email}
                    placeholderTextColor={"gray"}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter username"
                    onChangeText={setUsername}
                    value={username}
                    placeholderTextColor={"gray"}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter password"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={"gray"}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Confirm password"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholderTextColor={"gray"}
                />
            </View>
            <TouchableOpacity style={styles.inputContainer} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;
