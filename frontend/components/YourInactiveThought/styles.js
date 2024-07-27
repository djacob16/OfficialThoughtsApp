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
    thoughtBody: {
        flexDirection: "column"
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    userName: {
        color: Colors.grayFont,
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
        color: Colors.grayFont
    },
    thoughtTags: {
    },
    tags: {
        color: Colors.grayFont,
        fontSize: 12
    },
    thoughtInteractions: {
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