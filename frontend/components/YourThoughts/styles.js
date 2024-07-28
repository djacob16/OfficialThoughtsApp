import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    activeTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5
    },
    activeContainer: {
        marginBottom: 40
    },
    inactiveTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5
    },
})

export default styles;