import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    thoughtContainer: {
        width: "100%",
        flexDirection: "row",
    },
    thoughtBody: {
        width: "80%",
        flexDirection: "column",
    },
    profileContainer: {
        width: "15%",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 5,
        gap: 15,
    },
    userInfo: {
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    userName: {
        color: Colors.whiteFont,
        fontWeight: "500",
        fontSize: 15
    },
    anonymous: {
        color: Colors.yellowFont,
        fontSize: 12
    },
    notAnonymous: {
        color: Colors.whiteFont,
        fontSize: 12
    },
    addOptionsContainer: {
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.lightGray,
    },
    addOptionText: {
        color: Colors.whiteFont,
        fontSize: 14,
    },
    inputContainer: {
        height: 35,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    input: {
        height: 35,
        width: "90%",
        color: Colors.whiteFont
    },
    inputQuestion: {
        color: "white",
        width: "100%",
        height: 20,
        height: 50,
        fontSize: 16,
        paddingRight: 10
    },
    postButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25,
    },
    invalidPostButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: Colors.sectionGrey,
        borderWidth: 1,
        borderColor: Colors.whiteFont,
        borderRadius: 25,
    },
    postText: {
        color: "black"
    },
    invalidPostText: {
        color: Colors.grayFont
    },
    postContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 16,
        position: "absolute",
        bottom: 75
    },
    icon: {
        width: 18,
        height: 18
    },
})

export default styles