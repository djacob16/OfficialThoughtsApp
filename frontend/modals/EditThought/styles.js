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
        marginBottom: 10
    },
    bodyContainer: {
        width: "100%",
        paddingHorizontal: 16,
        height: 360
    },
    editContainer: {
        width: "100%",
        flexDirection: "row"
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
    time: {
        color: Colors.grayFont,
        fontSize: 10
    },
    thoughtBody: {
        width: "80%",
        flexDirection: "column",
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
    saveButtonContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        width: "100%",
        marginTop: 5,
        marginBottom: 75,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 16
    },
    icon: {
        width: 18,
        height: 18
    },
    input: {
        color: Colors.whiteFont,
        height: 55
    },
    photo: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        resizeMode: 'cover'
    },
    video: {
        width: "100%",
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    anonymous: {
        color: Colors.yellowFont
    },
    notAnonymous: {
        color: Colors.whiteFont
    },
    saveButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25
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
    inputOption: {
        height: 35,
        width: "90%",
        color: Colors.whiteFont
    },
    saveButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25,
    },
    invalidSaveButton: {
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
    saveText: {
        color: "black"
    },
    invalidSaveText: {
        color: Colors.grayFont
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


})

export default styles;