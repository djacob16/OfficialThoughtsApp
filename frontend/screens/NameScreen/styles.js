import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    nextButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.backgroundColor,
    },
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
        width: "100%",
        color: Colors.whiteFont,
    },
    confirmText: {
        fontSize: 25,
        fontWeight: "700",
        marginTop: 30,
        color: Colors.whiteFont,
        marginBottom: 20
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
    nextButton: {
        marginTop: 20,
        backgroundColor: Colors.yellowBackground,
        width: "100%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    next: {
        fontWeight: "600"
    }
})

export default styles;