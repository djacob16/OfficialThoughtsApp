import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
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
        width: "100%",
        borderColor: "white",
        borderWidth: 1,
        marginBottom: 25
    },
    error: {
        color: Colors.redFont,
        fontSize: 12,
        marginTop: 8,
        marginBottom: 8
    },
    forgotPasswordContainer: {
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: Colors.yellowFont,
    },
})

export default styles;