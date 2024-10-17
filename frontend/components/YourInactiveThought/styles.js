import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        borderBottomWidth: .2,
        borderBottomColor: Colors.grayFont,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    profileContainer: {
        width: "12%",
    },
    thoughtBody: {
        width: "83%",
        flexDirection: "column"
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    userName: {
        color: Colors.grayFont,
        fontWeight: "500"
    },
    time: {
        color: Colors.grayFont,
        fontSize: 10
    },
    thoughtContent: {
        paddingTop: 10,
        width: "100%"
    },
    content: {
        color: Colors.grayFont
    },
    photo: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'cover',
        opacity: .3
    },
    video: {
        width: "100%",
        height: 300,
        // aspectRatio: .565,
        marginBottom: 20,
        borderRadius: 10,
        marginTop: 10,
        opacity: .3
    },
    thoughtTags: {
    },
    tags: {
        color: Colors.grayFont,
        fontSize: 12
    },
    thoughtInteractions: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 22,
        height: 22
    },
    interactionNumber: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 5,
        paddingRight: 16
    },
    number: {
        color: Colors.grayFont,
    },
    pencilIcon: {
        width: 17,
        height: 16,
    },
    thoughtControllers: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    controllerIcons: {
        width: 18,
        height: 18
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
    optionsContainer: {
        paddingTop: 10,
        width: "100%",
        gap: 8,
    },
    optionContainer: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.lightGray,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden", // This ensures the background overlay doesn't exceed the container
        position: "relative"
    },
    optionContainerHighlighted: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.grayFont,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden", // This ensures the background overlay doesn't exceed the container
        position: "relative"
    },
    voteBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: Colors.lightGray, // Replace with your highlight color
    },
    optionText: {
        color: Colors.whiteFont,
        zIndex: 1, // Ensures the text appears above the background overlay
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
        marginTop: 10,
        backgroundColor: Colors.lightGray,
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
    threeDotsIcon: {
        width: 17,
        height: 4
    },
})

export default styles;