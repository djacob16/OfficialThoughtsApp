import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 70,
        backgroundColor: Colors.backgroundColor,
    },
    titleText: {
        color: Colors.whiteFont,
        fontSize: 22,
        marginBottom: 20
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
    input: {
        width: "100%",
        height: 55,
        color: Colors.whiteFont,
    },
    errorText: {
        color: Colors.redFont,
        marginBottom: 8,
        marginTop: -2,

    }
})

export default styles;