import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: Colors.backgroundColor,
    },
    container: {
        flex: 1,
        marginBottom: 10
    },
    navigator: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.sectionGrey,
        borderRadius: 25,
        width: "100%",
        height: 44,
        position: "relative",
        marginBottom: 20,
    },
    highlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#FBD157",
        borderRadius: 25,
        width: "50%",
        zIndex: -1,
    },
    navigatorText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
})

export default styles;