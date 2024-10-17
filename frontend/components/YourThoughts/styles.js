import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 8,
        paddingBottom: 100,
        zIndex: -1,
        position: "relative"
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    activeTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 15,
        paddingHorizontal: 8
    },
    activeContainer: {
        marginBottom: 40,
        paddingTop: 15,
    },
    inactiveContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 8,
        backgroundColor: Colors.sectionGrey
    },
    inactiveTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        paddingHorizontal: 8,
        marginBottom: 15,
    },
    activeSubText: {
        fontSize: 14,
        color: Colors.grayFont,
        paddingHorizontal: 50,
        textAlign: "center"
    },
    inactiveSubText: {
        fontSize: 14,
        color: Colors.grayFont,
        paddingHorizontal: 42,
        textAlign: "center"
    },
    optionsHeaderContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    optionsContainer: {
        width: "100%",
        backgroundColor: Colors.backgroundColor,
        borderRadius: 10,
    },
    option: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 18,
        borderBottomWidth: .2,
        borderBottomColor: Colors.grayFont
    }
})

export default styles;