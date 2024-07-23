import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { confirmSignUp, getCurrentUser, signIn } from "aws-amplify/auth";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import createOneUser from "../../data/createOneUser";


const Verify = () => {
    const route = useRoute();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const { email, password } = route.params;
    const navigation = useNavigation();

    const handleVerify = async () => {
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: email,
                confirmationCode: code
            });
            // if (isSignUpComplete) {
            //     navigation.navigate("Main")
            // }
            // const { userId } = await getCurrentUser();
            // const user = await createOneUser(userId);
            // console.log(user)
            try {
                const { isSignedIn, nextStep } = await signIn({ username: email, password });
                const user = await createOneUser();
                if (user) {
                    navigation.navigate("Main");
                }
            } catch (error) {
                console.log(error)
            }
        } catch (err) {
            console.log(err.message)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter code"
                    onChangeText={setCode}
                    value={code}
                    placeholderTextColor={"gray"}
                />
            </View>
            <TouchableOpacity style={styles.resendContianer} >
                <Text style={styles.buttonText}>resend code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputContainer} onPress={handleVerify}>
                <Text style={styles.buttonText}>verify</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Verify