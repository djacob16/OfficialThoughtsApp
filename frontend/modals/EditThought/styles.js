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
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.backgroundColor,
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
        marginTop: 20,
        backgroundColor: Colors.yellowBackground,
        width: "100%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    invalidSaveButton: {
        marginTop: 20,
        width: "100%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        backgroundColor: Colors.sectionGrey,
        borderWidth: 1,
        borderColor: Colors.whiteFont,
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
    trackContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        alignItems: "flex-start",
        paddingVertical: 10
    },
    trackContainerHighlighted: {
        width: "100%",
        paddingHorizontal: 8,
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        alignItems: "flex-start",
        paddingVertical: 10,
        backgroundColor: Colors.sectionGrey,
    },
    albumImageContianer: {
        width: "25%",
        alignItems: "center",
        justifyContent: "center"
    },
    trackInfoContainer: {
        width: "60%",
        gap: 5,
    },
    playButtonContainer: {
        width: "10%",
        height: 55,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 5,
    },
    trackTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "500"
    },
    artistTitle: {
        color: Colors.grayFont,
        fontSize: 13,
        fontWeight: "500"
    },
    notSupported: {
        color: Colors.redFont,
        fontSize: 10,
        fontWeight: "500"
    },
})

export default styles;