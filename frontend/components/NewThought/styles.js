import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        paddingHorizontal: 30,
        borderColor: Colors.whiteFont,
        borderWidth: 1
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "700"
    },
    inputTopContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
    },
    postButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25
    },
    name: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    input: {
        color: "white",
        width: "100%",
        height: 20,
        height: 75,
        fontSize: 16,
        paddingRight: 10
    },
    inputBottomContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 12
    },
    inputBottomLeftContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
        width: "40%",
        marginBottom: 12,
    },
    icon: {
        width: 18,
        height: 18
    },
})

export default styles;