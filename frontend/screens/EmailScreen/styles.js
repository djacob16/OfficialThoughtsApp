import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    nextButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.backgroundColor,
    },
})

export default styles;