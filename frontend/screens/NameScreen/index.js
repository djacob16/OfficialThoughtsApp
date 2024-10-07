import styles from "./styles";
import { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, Text } from "react-native";
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";
import SignupHeader from "../../components/SignupHeader";
import NextButton from "../../components/NextButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import SignupError from "../../components/SignupError";

const NameScreen = () => {
    const keyboardHeight = useKeyboardHeight();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [validName, setValidName] = useState(false);
    const route = useRoute();

    const { email: email, password: password } = route.params;

    useEffect(() => {
        setValidName(name.trim().split(/\s+/).length == 2);
        if (name.length == 0) {
            setNameError("")
        }
    }, [name])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <SignupHeader title={"Name"} />
                    <Input title={"Name"} name={name} setName={setName} validName={validName} />
                    <SignupError title={"Name"} nameError={nameError} />
                </View>
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}>
                <NextButton title={"Name"} name={name} email={email} password={password} setNameError={setNameError} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default NameScreen;
