import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { signUp } from 'aws-amplify/auth';
import LogoHeader from "../../components/LogoHeader";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (password === confirmPassword && email && name && familyName && username) {
            setError(false);
            try {
                const { isSignUpComplete, userId, nextStep } = await signUp({
                    username: email,
                    password: password,
                    options: {
                        userAttributes: {
                            email,
                            name,
                            family_name: familyName,
                        }
                    }
                });
                navigation.navigate("Verify", { email, password, username });
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setError(true);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
            <View style={styles.container}>
                <LogoHeader />
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
                        placeholder="Enter first name"
                        onChangeText={setName}
                        value={name}
                        placeholderTextColor={"gray"}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        placeholder="Enter last name"
                        onChangeText={setFamilyName}
                        value={familyName}
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
                <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.buttonText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Signup;
