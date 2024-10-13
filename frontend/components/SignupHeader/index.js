import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import backArrow from "../../assets/chevron-left.png"

const SignupHeader = ({ title }) => {
    const navigation = useNavigation();

    const toScreen = () => {
        navigation.goBack()
        if (title === "Verify") {
            navigation.navigate("Signin")
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 30, justifyContent: "center" }}>
                {title !== "Username" && title !== "Permissions" && <TouchableOpacity onPress={toScreen} style={styles.backArrowContainer}>
                    <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>}
                <View style={styles.createAccountContainer}>
                    <Text style={styles.createAccount}>Create Account</Text>
                </View>
            </View>
            {title === "Email" &&
                <View>
                    <Text style={styles.subtitle}>What's your email?</Text>
                    <Text style={styles.subtitleBelow}>don’t worry, we won’t spam you...</Text>
                </View>
            }
            {title === "Password" &&
                <View>
                    <Text style={styles.subtitle}>Create a password,</Text>
                    <Text style={styles.subtitleBelow}>one that you will never forget.</Text>
                </View>
            }
            {title == "Name" &&
                <View>
                    <Text style={styles.subtitle}>A bit about yourself,</Text>
                    <Text style={styles.subtitleBelow}>what's your full name?</Text>
                </View>
            }
            {title == "Verify" &&
                <View>
                    <Text style={styles.subtitle}>Verify your identity,</Text>
                    <Text style={styles.subtitleBelow}>just so we know you’re legit.</Text>
                </View>
            }
            {title == "Username" &&
                <View>
                    <Text style={styles.subtitle}>Create your username,</Text>
                    <Text style={styles.subtitleBelow}>no pressure... okay, maybe a little.</Text>
                </View>
            }
        </View>
    )
}

export default SignupHeader