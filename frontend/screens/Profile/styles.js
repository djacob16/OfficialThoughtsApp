import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        flex: 1,
    },
    backgroundContainer: {
        backgroundColor: Colors.backgroundColor,
        width: "100%",
        position: "relative",
    },
    backgroundImage: {
        width: "100%",
        width: 500,
        objectFit: "contain",
        position: "absolute",
        top: height * -.2,
        right: -55,
        zIndex: -1,
    },
    container: {
        flex: 1,
        marginTop: 125,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        zIndex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 70,
        paddingBottom: 70
    },
    profileImage: {
        position: "absolute",
        width: "100%",
        alignSelf: "center",
        backgroundColor: Colors.yellowFont,
        width: 160.346,
        height: 160.346,
        borderRadius: 100,
        top: 60,
        zIndex: 4
    },
    name: {
        fontSize: 30,
        color: Colors.whiteFont,
        fontWeight: "700"
    },
    verifiedContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        borderColor: "white",
        marginBottom: 5
    },
    verifiedIcon: {
    },
    joinedText: {
        color: Colors.grayFont,
        fontSize: 14,
        alignSelf: "center",
        marginBottom: 5
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.whiteFont,
        marginBottom: 15
    },
    friendsContainer: {
        alignSelf: "center",
        width: "55%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        marginBottom: 15
    },
    friendsText: {
        color: Colors.grayFont,
        fontSize: 14,
    },
    profileData: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 24.99,
        paddingHorizontal: 16,
    },
    data: {
        width: "33%",
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: "white",
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
    },
    toggleViewContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 16
    },
    viewIcons: {
        width: 30,
        height: 30,
        position: "absolute",
        right: 0,
        bottom: 25
    },
    navigator: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        width: "100%",
        height: 44,
        position: "relative",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray
    },
    highlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        borderBottomWidth: 2,
        borderBottomColor: "#FBD157",
        width: "20%",
        zIndex: -1,
    },
    navigatorText: {
        width: "25%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12
    },
    backArrowContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        top: 60,
        left: 10,
        width: "10%"
    },
    backArrowIcon: {
        width: 40,
        height: 40,
    },
    line: {
        width: "100%",
        borderColor: Colors.sectionGrey,
        borderWidth: .5,
        marginBottom: 20
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 100,
        right: 20,
        zIndex: 1,
        backgroundColor: Colors.lightGray,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        padding: 10,
        borderRadius: 60
    },
    closeButtonText: {
        color: Colors.whiteFont,
        width: 20,
        height: 20,
        fontWeight: 'bold',
    },
    fullScreenImage: {
        width: '100%',
        height: '80%',
    },
})

export default styles;