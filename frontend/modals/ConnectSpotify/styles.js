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
    headerText: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: "500"
    },
    cancelText: {
        color: Colors.whiteFont,
        fontSize: 15
    },
    bodyContainer: {
        flex: 1,
        paddingTop: 60,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    bodyText: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 20,
        color: "white",
        textAlign: "center"
    },
    connectButton: {
        backgroundColor: '#1DB954',
        padding: 10,
        paddingHorizontal: 35,
        borderRadius: 25,
        width: "100%",
        alignItems: "center",
        position: "absolute",
        bottom: 45
    },
    connectButtonText: {
        color: 'black',
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: 275
    },
})

export default styles;