import { TouchableOpacity, Text, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { signUp, signIn } from 'aws-amplify/auth';
import createOneUser from "../../data/createOneUser";

const NextButton = ({ title, exists, validEmail, email, emailError, setEmailError, password, confirmPassword, name, setNameError, username, validUsername, setUsernameError, setUsernameScreenLoading }) => {
    const navigation = useNavigation();

    const toNextScreen = async () => {
        if (title === "Email" && email.length > 0) {
            if (!validEmail) {
                setEmailError("Please enter a valid email address.")
            } else if (exists) {
                setEmailError("An account is already registerd with this account")
            } else {
                navigation.navigate("PasswordScreen", { email })
            }
        }

        if (title === "Password" && password === confirmPassword && password.length >= 8) {
            navigation.navigate("NameScreen", { email: email, password: password })
        }

        if (title == "Name") {
            if (name.trim().split(/\s+/).length == 2) {
                navigation.navigate("PreVerify", { email: email, password: password, name: name })
            } else if (name.length > 0) {
                setNameError("Please enter in the following format: first last")
            }
        }

        if (title == "Verify") {
            if (email && password && name) {
                const firstName = name.trim().split(/\s+/)[0];
                const lastName = name.trim().split(/\s+/)[1];
                try {
                    const { isSignUpComplete, userId, nextStep } = await signUp({
                        username: email,
                        password: password,
                        options: {
                            userAttributes: {
                                email,
                                name: firstName,
                                family_name: lastName,
                            }
                        }
                    });
                    navigation.navigate("Verify", { email: email, password: password, name: name });
                } catch (error) {
                    console.log("error sigining up", error);
                    Alert.alert("Error signing up, please try again later")
                    navigation.navigate("Signin")
                }
            } else {
                Alert.alert("Error signing up, please try again later")
                navigation.navigate("Signin")
            }
        }

        if (title == "Username") {
            if (!validUsername) {
                setUsernameError("This username is taken.")
            } else {
                setUsernameScreenLoading(true)
                try {
                    const user = await createOneUser(username, email);
                    if (user) {
                        console.log("successfully created user in dynamoDB")
                        navigation.navigate("AllowLocation");
                    }
                    setUsernameScreenLoading(false)
                } catch (error) {
                    console.log("error creating user in dynamoDB: ", error)
                    setUsernameScreenLoading(false)
                }
            }
        }
    }

    return (
        <>
            {title === "Email" &&
                <TouchableOpacity style={styles.nextButton} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            }
            {title === "Password" &&
                <TouchableOpacity style={styles.nextButton} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            }
            {title === "Name" &&
                <TouchableOpacity style={styles.nextButton} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            }
            {title === "Verify" &&
                <TouchableOpacity style={styles.nextButton} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            }
            {title === "Username" &&
                <TouchableOpacity style={styles.nextButton} onPress={toNextScreen}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default NextButton;