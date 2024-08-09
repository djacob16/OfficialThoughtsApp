import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
        backgroundColor: Colors.backgroundColor,
    },
    buttonText: {
        color: Colors.whiteFont,
    },
    inputContainer: {
        width: "100%",
        height: 55,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.whiteFont,
        color: Colors.whiteFont,
        marginBottom: 15,
        alignItems: "center",
        paddingLeft: 15,
        justifyContent: "center",
    },
    createAccountContainer: {
        width: "100%",
        height: 55,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.yellowFont,
        color: Colors.whiteFont,
        marginBottom: 15,
        alignItems: "center",
        paddingLeft: 15,
        justifyContent: "center",
    },
    createAccountText: {
        color: Colors.yellowFont,
    },
    inputContainerTwo: {
        width: "100%",
        height: 55,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.whiteFont,
        color: Colors.whiteFont,
        alignItems: "center",
        paddingLeft: 15,
        justifyContent: "center",
    },
    input: {
        width: "100%",
        height: 55,
        color: Colors.whiteFont,
    },
    line: {
        width: "45%",
        borderColor: "white",
        borderWidth: .5,
    },
    error: {
        color: Colors.redFont,
        fontSize: 12,
        marginBottom: 8
    },
    forgotPasswordContainer: {
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: Colors.yellowFont,
    },
    orText: {
        paddingHorizontal: 8,
        color: Colors.whiteFont
    }
})

export default styles;