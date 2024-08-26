import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 10,
        paddingBottom: 50
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
    confirmButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: 350,
        height: 45,
        backgroundColor: Colors.sectionGrey,
        borderRadius: 25,
    },
    confirmText: {
        color: "white"
    },
    connectButton: {
        backgroundColor: '#1DB954',
        padding: 10,
        paddingHorizontal: 35,
        borderRadius: 25,
        width: "100%",
        alignItems: "center",
        marginTop: 50
    },
    connectButtonText: {
        color: 'black',
        fontSize: 16,
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
        width: "40%",
        zIndex: -1,
    },
    navigatorText: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    searchContainer: {
        fontSize: 35,
        fontWeight: "600",
        color: "#FFF",
        width: "100%",
    },
    searchInputContainer: {
        height: 45,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    textInputContainer: {
        height: "100%",
        backgroundColor: Colors.sectionGrey,
        borderRadius: 15,
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    searchIcon: {
        position: "absolute",
        left: 10,
        width: 30,
        height: 30,
    },
    input: {
        height: "100%",
        width: '100%',
        color: "white",
        paddingLeft: 24
    },
    textInputFocused: {
        height: "100%",
        width: '100%',
        color: "white",
        paddingLeft: 24
    },
    searchResultsPage: {
        zIndex: 1,
        flex: 1,
        backgroundColor: Colors.sectionGrey
    }
})

export default styles