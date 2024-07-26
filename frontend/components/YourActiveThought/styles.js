import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        backgroundColor: Colors.backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayFont,
    },
    content: {
        color: Colors.whiteFont
    },
    usernameTimeContainer: {
        flexDirection: "column",
        gap: 4
    },
    time: {
        color: Colors.grayFont,
        fontSize: 10
    },
    interactionsContainer: {
        flexDirection: "row",
        marginTop: 12,
        gap: 15
    },
    icon: {
        width: 22,
        height: 22
    },
    interactionNumber: {
        flexDirection: "row",
        alignItems: "center"
    },
    number: {
        color: Colors.grayFont,
    },
    pencilIcon: {
        width: 17,
        height: 16,
    }
})

export default styles;