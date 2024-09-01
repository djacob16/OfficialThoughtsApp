import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 70,
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
        width: "30%",
        zIndex: -1,
    },
    navigatorText: {
        width: "30%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    timeHeader: {
        color: "white",
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: "500",
        paddingTop: 30,
        paddingBottom: 10
    }
})

export default styles;