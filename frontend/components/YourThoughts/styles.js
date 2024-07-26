import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    activeTitle: {
        color: Colors.whiteFont,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 15
    }
})

export default styles;