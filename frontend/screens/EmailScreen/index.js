import { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import SignupHeader from "../../components/SignupHeader";
import Input from "../../components/Input";
import NextButton from "../../components/NextButton";
import SignUpError from "../../components/SignupError";
import { listUsers } from "../../src/graphql/queries";
import { generateClient } from "aws-amplify/api"

const EmailScreen = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [exists, setExists] = useState(false);
    const client = generateClient();

    useEffect(() => {
        const emailExists = async () => {
            try {
                const response = (await client.graphql({
                    query: listUsers,
                })).data.listUsers.items;
                let found = false;
                for (const user of response) {
                    if (user.name === email) {
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
        <View style={styles.container}>
            <SignupHeader title={"Email"} />
            <Input title={"Email"} setEmail={setEmail} />
            <SignUpError title={"Email"} exists={exists} validEmail={validEmail} email={email} />
            <NextButton title={"Email"} exists={exists} validEmail={validEmail} email={email} />
        </View>
    )
}

export default EmailScreen;