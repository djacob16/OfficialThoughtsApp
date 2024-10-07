import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    textInputContainer: {
        height: 55,
        width: "100%",
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: Colors.whiteFont,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    textInput: {
        height: 55,
        width: "88%",
        color: Colors.whiteFont,
        // borderWidth: 1,
        // borderColor: "red"
    },
    confirmText: {
        fontSize: 25,
        fontWeight: "700",
        marginTop: 20,
        color: Colors.whiteFont,
        marginBottom: 10
    },
    error: {
        color: Colors.redFont,
        fontSize: 12,
        marginTop: 8
    },
    icon: {
        width: 20,
        height: 20
    },
    usernameInputContianer: {
        height: 55,
        marginLeft: 5,
        width: "74%",
        color: Colors.whiteFont,
    },
    profilePicContainer: {
        width: "10%"
    }
})

export default styles;