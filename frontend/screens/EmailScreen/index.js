import { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated } from "react-native";
import styles from "./styles";
import SignupHeader from "../../components/SignupHeader";
import Input from "../../components/Input";
import NextButton from "../../components/NextButton";
import SignUpError from "../../components/SignupError";
import { listUsers } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api"
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";

const EmailScreen = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [exists, setExists] = useState(false);
    const client = generateClient();
    const keyboardHeight = useKeyboardHeight();

    useEffect(() => {
        const emailExists = async () => {
            try {
                const response = (await client.graphql({
                    query: listUsers,
                })).data.listUsers.items;
                let found = false;
                for (const user of response) {
                    if (user.name.toLowerCase() === email) {
                        found = true;
                        setExists(true);
                        break;
                    }
                }
                if (!found) {
                    setExists(false);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        emailExists();
    }, [email]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegexValid = emailRegex.test(email);
        if (email.length > 0) {
            setValidEmail(emailRegexValid);
        }
    }, [email]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <SignupHeader title={"Email"} />
                    <Input title={"Email"} setEmail={setEmail} />
                    <SignUpError title={"Email"} exists={exists} validEmail={validEmail} email={email} />
                </View>
            </TouchableWithoutFeedback>

            {/* Animate the bottom positioning of the NextButton */}
            <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}>
                <NextButton title={"Email"} exists={exists} validEmail={validEmail} email={email} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default EmailScreen;
