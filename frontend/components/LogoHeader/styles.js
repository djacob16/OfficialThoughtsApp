import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-start",
        gap: 10,
        marginBottom: 20,
        paddingHorizontal: 16
    },
    logo: {
        width: 35,
        height: 29
    },
    logoText: {
        fontSize: 30,
        fontWeight: "700",
        color: Colors.whiteFont,
    }
})

export default styles;