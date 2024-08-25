import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 8,
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
})

export default styles