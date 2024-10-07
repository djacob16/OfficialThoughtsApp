import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";
import styles from "./styles";
import { useKeyboardHeight } from "../../customHooks/keyBoardHeight";
import SignupHeader from "../../components/SignupHeader";
import Input from "../../components/Input";
import { useRoute, useNavigation } from "@react-navigation/native";
import SignupError from "../../components/SignupError";
import NextButton from "../../components/NextButton";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "../../src/graphql/queries";

const UsernameScreen = () => {
    const client = generateClient();
    const keyboardHeight = useKeyboardHeight();
    const [username, setUsername] = useState("")
    const [validUsername, setValidUsername] = useState(false)
    const [usernameError, setUsernameError] = useState("");
    const [usernameScreenLoading, setUsernameScreenLoading] = useState(false);
    const route = useRoute();

    const { email: email } = route.params;


    useEffect(() => {
        const checkValidity = async (username) => {
            try {
                const response = (await client.graphql({
                    query: listUsers,
                })).data.listUsers.items;
                let found = false;
                for (const user of response) {
                    if (user?.displayName?.toLowerCase() === username) {
                        found = true;
                        setValidUsername(false);
                        setUsernameError("This username is taken.")
                        break;
                    }
                }
                if (!found) {
                    setValidUsername(true);
                    setUsernameError("")
                }
            } catch (error) {
                console.log("error checking validity of username: ", error)
            }
        }

        if (username.length > 0) {
            if (checkValidity(username)) {
                setValidUsername(true)
                setUsernameError("")
            } else {
                setUsernameError("This username is taken")
            }
        } else {
            setValidUsername(false)
            setUsernameError("")
        }
    }, [username])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <SignupHeader title={"Username"} />
                    <Input title={"Username"} username={username} setUsername={setUsername} validUsername={validUsername} />
                    <SignupError title={"Username"} usernameError={usernameError} />
                    <View style={styles.loadingContainer}>
                        {usernameScreenLoading && <ActivityIndicator size={"large"} />}
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}>
                <NextButton title={"Username"} username={username} email={email} validUsername={validUsername} setUsernameError={setUsernameError} setUsernameScreenLoading={setUsernameScreenLoading} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default UsernameScreen