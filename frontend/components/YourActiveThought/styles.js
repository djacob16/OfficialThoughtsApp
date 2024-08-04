import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    thoughtBody: {
        flexDirection: "column",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    userName: {
        color: Colors.whiteFont,
        fontWeight: "500"
    },
    time: {
        color: Colors.grayFont,
        fontSize: 10
    },
    thoughtContent: {
        paddingVertical: 10
    },
    content: {
        color: Colors.whiteFont
    },
    thoughtTags: {
    },
    tags: {
        color: Colors.grayFont,
        fontSize: 12
    },
    thoughtInteractions: {
        flexDirection: "row",
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
    },
    thoughtControllers: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    controllerIcons: {
        width: 18,
        height: 18
    }
})

export default styles;