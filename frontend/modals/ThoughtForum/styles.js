import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 45,
    },
    scrollViewContainer: {
        paddingHorizontal: 16
    },
    ThoughtContainer: {
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 15,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B2D2F",
        borderRadius: 10,
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        color: "white",
        borderRadius: 20,
        backgroundColor: "#2B2D2F",
    },
    sendArrow: {
        width: 30,
        height: 30
    },
})

export default styles;