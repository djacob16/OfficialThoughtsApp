import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 250,
        backgroundColor: Colors.backgroundColor,
        alignItems: "center",
        paddingHorizontal: 16
    },
    image: {
        width: "100%",
        height: 275
    },
    text: {
        color: Colors.whiteFont,
        marginBottom: 200,
        textAlign: "center",
        fontSize: 16
    },
    locationButton: {
        backgroundColor: Colors.yellowFont,
        width: "90%",
        height: 40,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "black"
    }
})

export default styles;