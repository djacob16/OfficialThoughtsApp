import { useState, useEffect } from "react"
import { View, Text } from "react-native";
import styles from "./styles";
import SignupHeader from "../../components/SignupHeader";
import Input from "../../components/Input";
import SignUpError from "../../components/SignupError";
import NextButton from "../../components/NextButton";
import { useRoute, useNavigation } from "@react-navigation/native";

const PasswordScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsAreTheSame, setPasswordsAreTheSame] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();

    const { email } = route.params;

    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordsAreTheSame(true);
        } else {
            setPasswordsAreTheSame(false);
        }
    }, [password, confirmPassword]);

    return (
        <View style={styles.container}>
            <SignupHeader title={"Password"} />
            <Input title={"Password"} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
            <SignUpError title={"Password"} password={password} confirmPassword={confirmPassword} passwordsAreTheSame={passwordsAreTheSame} />
            {password.length >= 8 ? <Text style={{ marginTop: 12, fontSize: 12, color: "green" }}>Password must be 8 charaters or more</Text> : <Text style={{ marginTop: 12, fontSize: 12, color: "white" }}>Password must be 8 charaters or more</Text>}
            <NextButton title={"Password"} password={password} confirmPassword={confirmPassword} />
        </View>
    )
}

export default PasswordScreen;