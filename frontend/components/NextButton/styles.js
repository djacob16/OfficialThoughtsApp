import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
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