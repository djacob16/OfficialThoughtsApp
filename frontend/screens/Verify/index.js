import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { confirmSignUp, signIn, resendSignUpCode } from "aws-amplify/auth";
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import createOneUser from "../../data/createOneUser";
import { signUp } from 'aws-amplify/auth';
import SignupHeader from "../../components/SignupHeader";
import Signin from "../Signin";



const Verify = () => {
    const route = useRoute();
    const [error, setError] = useState("");
    const { email, password, name } = route.params;
    const navigation = useNavigation();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);


    // const handleVerify = async () => {
    //     try {
    //         const { isSignUpComplete, nextStep } = await confirmSignUp({
    //             username: email,
    //             confirmationCode: code
    //         });
    //         console.log("isSignUpComplete: ", isSignUpComplete)
    //         console.log("nextStep: ", nextStep)
    //     } catch (error) {
    //         console.log("error verifying user: ", error)
    //     }
    // };

    // Handler for changing the value of a specific input
    const handleChange = (value, index) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }

        if (newCode.every((digit) => digit !== "")) {
            handleSubmit(newCode.join(""));
        }
    };

    const handleSubmit = async (code) => {
        try {
            setLoading(true);
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: email,
                confirmationCode: code
            });
            await signIn({ username: email, password })
            navigation.navigate("UsernameScreen", { email: email })
            setLoading(false);
            console.log("isSignUpComplete: ", isSignUpComplete)
            console.log("nextStep: ", nextStep)
        } catch (error) {
            setLoading(false);
            console.log("error verifying user: ", error)
            Alert.alert("Incorrect confirmation code, try again")
            setCode(["", "", "", "", "", ""])
        }
    };

    const handleBackspace = (value, index) => {
        if (value === "" && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <SignupHeader title="Verify" />
                    <View style={styles.inputContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(input) => (inputs.current[index] = input)}
                                style={[
                                    styles.input,
                                    { borderColor: digit ? "#FFF" : "gray" }
                                ]}
                                keyboardType="numeric"
                                maxLength={1}
                                value={digit}
                                onChangeText={(value) => handleChange(value, index)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === "Backspace") {
                                        handleBackspace(digit, index);
                                    }
                                }}
                            />
                        ))}
                    </View>
                    <Text style={styles.subTitle}>Please check your email for a verification code.</Text>
                    <TouchableOpacity onPress={() => resendSignUpCode({ username: email })}>
                        <Text style={styles.resend}>Click to resend</Text>
                    </TouchableOpacity>
                    <View style={styles.loadingContainer}>
                        {loading && <ActivityIndicator size={"large"} />}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
export default Verify