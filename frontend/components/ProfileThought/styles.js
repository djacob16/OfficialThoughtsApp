import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    image: {
        width: "33%",
        height: 150
    },
    textContainer: {
        width: "33%",
        height: 150,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16
    },
    content: {
        color: "white",
        fontSize: 12
    }
})

export default styles;