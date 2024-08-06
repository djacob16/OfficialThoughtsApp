import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 8
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
    }
})

export default styles;