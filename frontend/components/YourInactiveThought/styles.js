import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    profileContainer: {
        width: "15%",
    },
    thoughtBody: {
        width: "85%",
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
        paddingVertical: 10
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
        marginTop: 12,
        gap: 15
    },
    icon: {
        width: 22,
        height: 22
    },
    interactionNumber: {
        flexDirection: "row",
        alignItems: "center"
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
        gap: 10
    },
    optionContainerHighlighted: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: Colors.sectionGrey,
        borderColor: Colors.whiteFont,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    optionText: {
        color: Colors.whiteFont
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
})

export default styles;