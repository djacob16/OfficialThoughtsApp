import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        position: "relative",
    },
    backgroundImage: {
        width: "100%",
        width: 500,
        objectFit: "contain",
        position: "absolute",
        top: -150,
        right: -55,
        zIndex: -1,
    },
    container: {
        flex: 1,
        marginTop: 150,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 16,
        zIndex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingVertical: 110
    },
    profileImage: {
        position: "absolute",
        width: "100%",
        alignSelf: "center",
        backgroundColor: Colors.yellowFont,
        width: 169.346,
        height: 169.346,
        borderRadius: 100,
        top: 80,
        zIndex: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 30,
        color: Colors.whiteFont,
        textAlign: "center",
        paddingBottom: 14.78,
        fontWeight: "700"
    },
    verifiedContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 15
    },
    verified: {
        fontSize: 14,
        color: Colors.whiteFont,
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.whiteFont,
        marginBottom: 24.07
    },
    profileData: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 24.99
    },
    data: {
        width: "33%",
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: "white"
    },
    number: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 8
    },
    title: {
        color: Colors.yellowFont,
    },
    titleParked: {
        color: "#38C581",
    },
    dataLast: {
        width: "28%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.lightGray,
        borderRadius: 15,
        gap: -10,
        paddingVertical: 5
    },
    parkedContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "stretch",
    },
    latestThoughtContainer: {
        width: "100%",
        backgroundColor: "#282828",
        paddingTop: 18.74,
        paddingHorizontal: 21.1,
        paddingBottom: 12.76,
        borderRadius: 25,
        opacity: .78,
        shadowColor: "#282828",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    titleTimeContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16.98
    },
    latestThought: {
        color: Colors.grayFont,
        fontSize: 14
    },
    time: {
        color: Colors.grayFont,
        fontSize: 14
    },
    thought: {
        color: Colors.whiteFont,
        fontSize: 18
    }
})

export default styles;