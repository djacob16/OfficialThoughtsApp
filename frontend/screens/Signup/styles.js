import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 50,
        backgroundColor: Colors.backgroundColor,
    },
    buttonText: {
        color: Colors.whiteFont,
    }
})

export default styles;