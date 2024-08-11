import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

const ForgotPassword = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handleForgotPassword = async () => {
        setError(false);
        if (email) {
            try {
                const output = await resetPassword({ username: email });
                handleForgotPasswordNextSteps(output);
                navigation.navigate("ResetPassword", { email })
            } catch (err) {
                console.log(err.message);
                setError(true)
            }
        } else {
            setError(true);
        }
    }

    const handleForgotPasswordNextSteps = (output) => {
        const { nextStep } = output;
        switch (nextStep.resetPasswordStep) {
            case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
                const codeDeliveryDetails = nextStep.codeDeliveryDetails;
                console.log(
                    `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
                );
                // Collect the confirmation code from the user and pass to confirmResetPassword.
                break;
            case 'DONE':
                console.log('Successfully reset password.');
                break;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Forgot password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    onChangeText={setEmail}
                    value={email}
                    placeholderTextColor={"gray"}
                />
            </View>
            {error && <Text style={styles.errorText}>Enter valid email</Text>}
            <TouchableOpacity style={styles.inputContainer} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Send code</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ForgotPassword;