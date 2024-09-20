import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    textInputContainer: {
        height: 55,
        width: "100%",
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: Colors.whiteFont
    },
    textInput: {
        height: 55,
        width: "100%",
        color: Colors.whiteFont,
    },
    confirmText: {
        fontSize: 25,
        fontWeight: "600",
        marginTop: 20,
        color: Colors.whiteFont,
        marginBottom: 20
    },
    error: {
        color: Colors.redFont,
        fontSize: 12,
        marginTop: 8
    }
})

export default styles;