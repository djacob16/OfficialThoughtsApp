import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    headerContainer: {
        flexDirection: "row",
        borderBottomWidth: .5,
        borderBottomColor: Colors.lightGray,
        justifyContent: "space-between",
        paddingVertical: 15,
        alignItems: "center",
        paddingHorizontal: 16,
    },
    headerText: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: "500"
    },
    cancelText: {
        color: Colors.whiteFont,
        fontSize: 15
    },
    bodyContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 16,
    },
    thoughtContainer: {
        width: "100%",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
    },
    thoughtBody: {
        width: "80%",
        flexDirection: "column",
    },
    profileContainer: {
        width: "15%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 5
    },
    userInfo: {
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    userName: {
        color: Colors.whiteFont,
        fontWeight: "500"
    },
})

export default styles