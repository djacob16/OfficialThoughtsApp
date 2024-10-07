import { useState, useEffect } from "react"
import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, Text } from "react-native";
import styles from "./styles";
import SignupHeader from "../../components/SignupHeader";
import Input from "../../components/Input";
import SignUpError from "../../components/SignupError";
import NextButton from "../../components/NextButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";

const PasswordScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const route = useRoute();
    const keyboardHeight = useKeyboardHeight();

    const { email } = route.params;

    useEffect(() => {
        if (confirmPassword.length > 0 && password !== confirmPassword) {
            setPasswordError("Passwords must match")
        }
        if (password === confirmPassword) {
            setPasswordError("")
        }
        if (password.length == 0 && confirmPassword.length == 0) {
            setPasswordError("")
        }
    }, [confirmPassword, password]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <SignupHeader title={"Password"} />
                    <Input title={"Password"} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
                    {password.length >= 8 ? <Text style={{ marginTop: 12, fontSize: 12, color: "#82D179" }}>Password must be 8 charaters or more</Text> : <Text style={{ marginTop: 12, fontSize: 12, color: "white" }}>Password must be 8 charaters or more</Text>}
                    <SignUpError title={"Password"} passwordError={passwordError} />
                </View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}>
                <NextButton title={"Password"} password={password} confirmPassword={confirmPassword} email={email} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default PasswordScreen;