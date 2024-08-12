import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 25,
    },
    scrollViewContainer: {
        paddingHorizontal: 16
    },
    ThoughtContainer: {
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 15,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#2B2D2F",
        borderRadius: 10,
        width: "98%",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 60,
    },
    input: {
        flex: 1,
        marginRight: 10,
        color: "white",
        borderRadius: 20,
        backgroundColor: "#2B2D2F",
    },
    sendArrow: {
        width: 30,
        height: 30
    },
    commentsContainer: {
        marginTop: 20,
        flexDirection: "column",
        gap: 10,
        marginBottom: 50,
    },
    commentContainer: {
        paddingLeft: 36,
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: .5,
        borderBottomColor: Colors.lightGray,
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between"
    },
    thoughtBody: {
        flexDirection: "column",
        gap: 8,
        marginBottom: 8
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 8
    },
    userName: {
        color: Colors.whiteFont,
        fontWeight: "500"
    },
    time: {
        color: Colors.grayFont,
        fontSize: 10
    },
    thoughtContent: {
        marginBottom: 15
    },
    content: {
        color: Colors.whiteFont
    },
    thoughtTags: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",

    },
    addButton: {
        backgroundColor: "#202124",
        width: 18,
        height: 18,
        borderRadius: 55,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2C2C2C"
    },
    addText: {
        color: Colors.whiteFont,
        fontSize: 10
    },
    tags: {
        color: Colors.grayFont,
        fontSize: 12
    },
    threeDots: {
        color: Colors.grayFont,
        fontSize: 20
    },
    thoughtInteractions: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    icon: {
        width: 22,
        height: 22
    },
    threeDotsIcon: {
        width: 17,
        height: 4
    },
    interactionNumber: {
        flexDirection: "row",
        alignItems: "center"
    },
    number: {
        color: Colors.grayFont,
    },
    parkedDistanceContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 5,
        alignItems: "center",
    },
    parkedDistance: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    parkedIcon: {
        width: 10,
        height: 18
    },
    parkedText: {
        color: "yellow"
    },
    contentLoaderContainer: {
        flex: 1,
    }
})

export default styles;