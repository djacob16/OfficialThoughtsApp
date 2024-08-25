import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Animated, Easing, ActivityIndicator } from "react-native";
import styles from "./styles";
import Video from "react-native-video";
// import bgVid from "../../assets/shortBgVid.mp4";
import { signIn } from "@aws-amplify/auth";
import logo from "../../assets/logo.png"
import { getCurrentUser } from "@aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [focused, setFocused] = useState(false);
    const navigation = useNavigation();
    const [loadingSignin, setLoadingSignin] = useState(false)

    const containerHeight = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => {
            animateContainerHeight(50);
        });
        const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => {
            animateContainerHeight(50);
        });

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);

    const animateContainerHeight = (toValue) => {
        Animated.timing(containerHeight, {
            toValue,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    const login = async () => {
        setError("");
        setLoadingSignin(true)
        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });
            if (isSignedIn) {
                navigation.navigate("Main");
            }
            setLoadingSignin(false)
            setEmail("");
            setPassword("");
            if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
                resendSignUpCode({ username: email });
                navigation.navigate("Verify", { email });
            }
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
            <View style={styles.black}>
                {/* <Video source={{ uri: ("../../assets/shortBgVid.mp4") }} muted={true} style={styles.video} rate={.8} /> */}
                <Animated.View style={[styles.signinContainer, { top: containerHeight }]}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.welcomeTitle}>Welcome to Thoughts</Text>
                    </View>
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
                    <View style={invalid ? styles.inputContainerTwo : styles.inputContainer}>
                        <TextInput
                            autoCapitalize={"none"}
                            style={styles.input}
                            placeholder="Enter password"
                            onFocus={() => setFocused(true)}
                            onChangeText={setPassword}
                            value={password}
                            placeholderTextColor={"gray"}
                        />
                    </View>
                    {error && <Text style={styles.error}>{error}</Text>}
                    {loadingSignin ? (
                        <TouchableOpacity style={styles.inputContainer}>
                            <Text style={styles.buttonText}>Signing in...</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={login} style={styles.inputContainer}>
                            <Text style={styles.buttonText}>Sign in</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.createAccountContainer}>
                        <Text style={styles.createAccountText}>Create an account</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback >
    );
};

export default Signin;
