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
        borderRadius: 8,
        backgroundColor: Colors.sectionGrey
    },
    inactiveContainer: {
        paddingVertical: 15,
        borderRadius: 8,
    },
    inactiveTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5,
        paddingHorizontal: 8,
    },
})

export default styles;