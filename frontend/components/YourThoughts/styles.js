import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 16
    },
    activeTitle: {
        paddingLeft: 8,
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5
    },
    activeContainer: {
        marginBottom: 40,
        backgroundColor: Colors.sectionGrey,
        paddingVertical: 15,
        borderRadius: 15
    },
    inactiveContainer: {
        backgroundColor: Colors.sectionGrey,
        paddingVertical: 15,
        borderRadius: 15,
    },
    inactiveTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5,
        paddingLeft: 8,
    },
})

export default styles;