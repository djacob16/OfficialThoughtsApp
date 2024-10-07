import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Animated, Easing, ActivityIndicator } from "react-native";
import styles from "./styles";
import { signInWithRedirect, signUp, getCurrentUser, signIn, resendSignUpCode, signOut } from "aws-amplify/auth";
import Video from "react-native-video";
// import bgVid from "../../assets/shortBgVid.mp4";
import logo from "../../assets/logo.png"
import { useNavigation } from "@react-navigation/native";
import emailIcon from "../../assets/Envelope.png";
import eyeClose from "../../assets/Eye-closed.png";
import eyeOpen from "../../assets/eye.png"
import { Colors } from "../../constants/colors";
import { getUserById } from "../../data/getUserById";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [focused, setFocused] = useState(false);
    const navigation = useNavigation();
    const [loadingSignin, setLoadingSignin] = useState(false)
    const [secureTextEntryStatus, setSecureTextEntryStatus] = useState(true)
    const [emailFocus, setEmailFocus] = useState(false)

    const login = async () => {
        setError("");
        setLoadingSignin(true)
        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });
            if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
                resendSignUpCode({ username: email });
                navigation.navigate("Verify", { email });
            }
            const { userId } = await getCurrentUser();
            console.log("userID: ", userId)
            const user = await getUserById(userId);
            if (isSignedIn && user) {
                navigation.navigate("Main");
            } else {
                navigation.navigate("UsernameScreen", { email })
            }
            setLoadingSignin(false)
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
            setError(err.message);
            setLoadingSignin(false)
        }
    };

    useEffect(() => {
        setError("")
        const checkLoggedin = async () => {
            try {
                const { userId } = await getCurrentUser();
                if (userId) {
                    const user = await getUserById(userId);
                    if (user) {
                        navigation.navigate("Main");
                    } else {
                        await signOut();
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        checkLoggedin();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
            <View style={styles.signinContainer}>
                {/* <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.welcomeTitle}>Welcome to Thoughts</Text>
                </View> */}
                <Text style={styles.title}>Sign in</Text>
                <Text style={styles.subTitle}>Email</Text>
                <View style={styles.inputContainer}>
                    <Image source={emailIcon} style={styles.icon} />
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        placeholder="example.com"
                        onChangeText={setEmail}
                        onFocus={() => setEmailFocus(!emailFocus)}
                        value={email}
                        placeholderTextColor={"gray"}
                    />
                </View>
                <Text style={styles.subTitle}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        placeholder="password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={secureTextEntryStatus}
                        placeholderTextColor={"gray"}
                    />
                    <TouchableOpacity onPress={() => setSecureTextEntryStatus(!secureTextEntryStatus)}>
                        <Image source={secureTextEntryStatus ? eyeClose : eyeOpen} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={{ height: 10 }}></View>
                {loadingSignin ? (
                    <TouchableOpacity style={styles.signinButton}>
                        <Text style={styles.signinButtonText}>Signing in...</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={login} style={styles.signinButton}>
                        <Text style={styles.signinButtonText}>Sign in</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.buttonText}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 17 }}>
                    <View style={styles.line}></View>
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("EmailScreen")} style={styles.createAccountContainer}>
                    <Text style={styles.createAccountText}>Sign up</Text>
                </TouchableOpacity>
                <View style={styles.logoBottomContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={{ color: "white" }}>Created by a buch of 19 year olds</Text>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
};

export default Signin;
