import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        paddingHorizontal: 16,
        position: "relative"
    },
    loadingContainer: {
        position: "absolute",
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: Colors.lightGray,
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 50,
        borderRadius: 10,
        top: 200,
        left: 100,
        zIndex: 2,
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
        width: "50%",
        marginBottom: 12,
        gap: 20,
        alignItems: "flex-start"
    },
    inputBottomRightContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "50%",
        marginBottom: 12,
        gap: 12
    },
    icon: {
        width: 22,
        height: 22
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
    },
    video: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'cover'
    },
    trackContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        alignItems: "flex-start",
        paddingVertical: 10,
        marginBottom: 10,
    },
    trackContainerHighlighted: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        alignItems: "flex-start",
        paddingVertical: 10,
        backgroundColor: Colors.sectionGrey
    },
    trackInfoContainer: {
        width: "65%",
        gap: 5
    },
    playButtonContainer: {
        flex: 1,
        height: 55,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    trackTitle: {
        color: "white",
        fontSize: 17,
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