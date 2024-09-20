import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    title: {
        fontSize: 25,
        color: "white",
        fontWeight: "700",
        paddingTop: 20,
        paddingBottom: 20,
    },
    subTitle: {
        fontSize: 15,
        color: "white",
        fontWeight: "400",
        paddingBottom: 10,
        paddingLeft: 5
    },
    black: {
        backgroundColor: "black",
    },
    video: {
        zIndex: -1,
        position: "relative",
        height: 280,
        opacity: .4
    },
    welcomeTitle: {
        color: Colors.whiteFont,
        fontSize: 25,
        fontWeight: "700",
    },
    signinContainer: {
        flex: 1,
        width: "100%",
        paddingTop: 60,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: Colors.backgroundColor,
    },
    textInputContainer: {
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
    input: {
        width: "100%",
        height: 55,
        color: Colors.whiteFont,
    },
    inputContainer: {
        width: "100%",
        height: 55,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: Colors.whiteFont,
        color: Colors.whiteFont,
        marginBottom: 15,
        alignItems: "center",
        paddingHorizontal: 30,
        justifyContent: "center",
        flexDirection: "row",
        gap: 5
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
    buttonText: {
        color: Colors.whiteFont,
    },
    line: {
        width: "45%",
        borderColor: Colors.lightGray,
        borderWidth: 1,
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
    logoContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingBottom: 30
    },
    logo: {
        width: 40,
        height: 33,
    },
    icon: {
        width: 25,
        height: 25
    }
})

export default styles;