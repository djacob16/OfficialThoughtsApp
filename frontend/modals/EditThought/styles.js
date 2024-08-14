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
    editButtonContainer: {
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
        color: Colors.whiteFont
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
    editButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25
    },


})

export default styles;