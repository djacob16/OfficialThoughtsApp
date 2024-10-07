import { View, Text, TextInput, Image } from "react-native";
import emailIcon from "../../assets/Envelope.png";
import greenEmailIcon from "../../assets/Envelope-green.png"
import greenCheck from "../../assets/green-check.png";
import checkIcon from "../../assets/check.png"
import defaultPic from "../../assets/defaultPic.jpg"

import styles from "./styles";

const Input = ({ title, setEmail, setPassword, setConfirmPassword, exists, validEmail, setName, validName, validUsername, setUsername }) => {
    return (
        <View>
            {title === "Email" &&
                <View style={styles.textInputContainer}>
                    <Image source={!exists && validEmail ? greenEmailIcon : emailIcon} style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        placeholder="Enter your email"
                        placeholderTextColor={"gray"}
                        onChangeText={setEmail}
                        autoFocus={true}
                    />
                </View>
            }
            {title === "Password" && (
                <>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize={"none"}
                            placeholder="Enter your password"
                            placeholderTextColor={"gray"}
                            onChangeText={setPassword}
                            autoFocus={true}
                        />
                    </View>
                    <Text style={styles.confirmText}>Confirm Your Password</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize={"none"}
                            placeholder="Confirm your password"
                            placeholderTextColor={"gray"}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </>
            )}
            {title === "Name" &&
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        placeholder="First Last"
                        placeholderTextColor={"gray"}
                        onChangeText={setName}
                        autoFocus={true}
                    />
                    <Image source={validName ? greenCheck : checkIcon} style={{ width: 25, height: 20 }} />
                </View>
            }
            {title === "Username" &&
                <View style={styles.textInputContainer}>
                    <View style={styles.profilePicContainer}>
                        <Image source={defaultPic} style={{ width: 35, height: 35, borderRadius: 15 }} />
                    </View>
                    <TextInput
                        style={styles.usernameInputContianer}
                        autoCapitalize={"none"}
                        placeholder="johndoe334"
                        placeholderTextColor={"gray"}
                        onChangeText={setUsername}
                        autoFocus={true}
                    />
                    <Image source={validUsername ? greenCheck : checkIcon} style={{ width: 25, height: 20 }} />
                </View>
            }
        </View >
    )
}

export default Input;