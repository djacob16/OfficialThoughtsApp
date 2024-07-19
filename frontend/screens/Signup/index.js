import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles"
import { signInWithRedirect, signUp, getCurrentUser, signOut } from "aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const signInWithGoogle = async () => {
        signInWithRedirect({ provider: "Google" })
        // try {
        //     const { isSignUpComplete, userId, nextStep } = await signUp({
        //         username,
        //         password
        //     })
        // } catch (err) {
        //     console.log(err.message);
        // }
    };

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            console.log("payload: ", payload);
            if (payload.event === "signedIn") {
                navigation.navigate("Main")
            }
            switch (payload.event) {
                case "signInWithRedirect":
                    break;
                case "signInWithRedirect_failure":
                    setError("An error has occurred during the OAuth flow.");
                    break;
            }
        });
        return unsubscribe;
    }, []);

    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const user = await getCurrentUser();
    //             console.log("user: ", user);
    //         } catch (err) {
    //             console.log(err.message)
    //         }
    //     }
    //     getUser()
    // }, [])

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* <View style={styles.inputContainer}>
                <TextInput autoCapitalize={"none"} value={username} style={styles.input} onChangeText={setUsername} placeholder="Enter a username" placeholderTextColor={"gray"} />
            </View> */}
            {/* <View style={styles.inputContainer}>
                <TextInput autoCapitalize={"none"} value={password} style={styles.input} onChangeText={setPassword} placeholder="Password" placeholderTextColor={"gray"} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput autoCapitalize={"none"} value={confirmPassword} style={styles.input} onChangeText={setConfirmPassword} placeholder="Confirm Password" placeholderTextColor={"gray"} />
            </View> */}
            {/* <View style={styles.inputContainer}>
                <TextInput autoCapitalize={"none"} style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter your phone number" placeholderTextColor={"gray"} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput autoCapitalize={"none"} style={styles.input} value={birthdate} onChangeText={setBirthdate} placeholder="Enter your birthday" placeholderTextColor={"gray"} />
            </View> */}
            <TouchableOpacity onPress={signInWithGoogle}>
                <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={styles.alreadyContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                    <Text>Sign in</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => signOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup;