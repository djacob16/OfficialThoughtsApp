import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    rightActionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        flexDirection: "row"
    },
    toggleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        backgroundColor: Colors.lightGray,
        height: "100%"
    },
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        backgroundColor: "red",
        height: "100%"
    }
})

export default styles;