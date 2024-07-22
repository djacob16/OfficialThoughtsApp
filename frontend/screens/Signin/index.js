import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { signInWithRedirect, signUp, getCurrentUser, signIn, resendSignUpCode } from "aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useNavigation } from "@react-navigation/native";
import LogoHeader from "../../components/LogoHeader";

const Signin = () => {
    const [error, setError] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const signInWithGoogle = () => {
        signInWithRedirect({ provider: "Google" })
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            if (payload.event == "signedIn") {
                navigation.navigate("Main")
            }
            switch (payload.event) {
                case "signInWithRedirect":
                    navigation.navigate("Main")
                    break;
                case "signInWithRedirect_failure":
                    setError("An error has occurred during the OAuth flow.");
                    break;
            }
        });
        return () => unsubscribe();
    }

    useEffect(() => {
        const checkLoggedin = async () => {
            try {
                const { userId } = await getCurrentUser();
                console.log("user id: ", userId);
                if (userId) {
                    navigation.navigate("Main");
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        checkLoggedin();
    }, [])

    const login = async () => {
        setInvalid(false);
        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });
            if (isSignedIn) {
                navigation.navigate("Main");
            }
            setEmail("")
            setPassword("")
            if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
                resendSignUpCode({ username: email })
                navigation.navigate("Verify", { email })
            }
        } catch (err) {
            console.log(err);
            if (err.message === "username is required to signIn" || err.message === "User does not exist.") {
                setInvalid(true);
            }
        }
    }

    return (
        <View style={styles.container}>
            <LogoHeader />
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter email"
                    onChangeText={setEmail}
                    value={email}
                    placeholderTextColor={"gray"}>
                </TextInput>
            </View>
            <View style={invalid ? styles.inputContainerTwo : styles.inputContainer}>
                <TextInput
                    autoCapitalize={"none"}
                    style={styles.input}
                    placeholder="Enter password"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={"gray"}>
                </TextInput>
            </View>
            {invalid && <Text style={styles.error}>Invalid email or password</Text>}
            <TouchableOpacity onPress={login} style={styles.inputContainer}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.buttonText}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 17 }}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
            </View>
            <TouchableOpacity onPress={() => signInWithGoogle()} style={styles.inputContainer}>
                <Text style={styles.buttonText}>Continue on with google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.buttonText}>
                <Text style={styles.buttonText}>Create an account?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signin;