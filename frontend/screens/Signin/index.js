import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { signInWithRedirect, signUp, getCurrentUser, signOut } from "aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
    const [error, setError] = useState("");

    const signInWithGoogle = () => {
        signInWithRedirect({ provider: "Google" })
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            console.log("payload: ", payload);
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
        return unsubscribe;
    }

    useEffect(() => {
        const getUser = async () => {
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
        getUser();
    }, [])

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => signInWithGoogle()}>
                <Text style={styles.buttonText}>Sign in with google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signin;