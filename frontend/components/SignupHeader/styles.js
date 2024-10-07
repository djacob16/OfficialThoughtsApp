import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: "700",
        color: Colors.whiteFont,
        marginBottom: 2
    },
    subtitleBelow: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.whiteFont
    },
    headerContainer: {
        flexDirection: "row",
        width: "100%"
    },
    backArrowContainer: {
        position: "absolute",
        zIndex: 20
    },
    backArrow: {
        width: 30,
        height: 30
    },
    createAccount: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.whiteFont,
        fontWeight: "600"
    }
})

export default styles;