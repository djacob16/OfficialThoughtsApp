import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"
import { Profiler } from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: "row",
        width: "100%",
        gap: 10,
        paddingHorizontal: 16,
    },
    thoughtBody: {
        flexDirection: "column",
        gap: 8,
    },
    profileContainer: {
        width: "9%",
    },
    midSectionContainer: {
        width: "78%",
    },
    midSectionContainerExtended: {
        width: "85%",
    },
    parkedDistanceContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 5,
        alignItems: "center",
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
    photo: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'cover'
    },
    video: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'cover'
    },
    mediaContainer: {
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 10,
        zIndex: 1,
        backgroundColor: Colors.lightGray,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        padding: 10,
        borderRadius: 50
    },
    closeButtonText: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: 'bold',
    },
    fullScreenImage: {
        width: '100%',
        height: '80%',
    },
})

export default styles