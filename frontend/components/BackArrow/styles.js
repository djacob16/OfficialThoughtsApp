import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flexDirection: "row",
        gap: 100,
        alignItems: "center"
    },
    icon: {
        width: 40,
        height: 40,
    },
    title: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "700"
    }
})

export default styles;