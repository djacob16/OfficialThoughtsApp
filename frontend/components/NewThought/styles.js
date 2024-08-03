import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        paddingHorizontal: 16
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 12,
    },
    inputBottomLeftContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        width: "40%",
        marginBottom: 12,
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputBottomRightContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "60%",
        marginBottom: 12,
        gap: 12
    },
    icon: {
        width: 18,
        height: 18
    },
    anonymousContainer: {
        alignItems: "baseline",
        justifyContent: "center",
        paddingTop: 2
    },
    anonymous: {
        color: Colors.yellowFont,
        fontSize: 12
    },
    notAnonymous: {
        color: Colors.whiteFont,
        fontSize: 12
    }
})

export default styles;