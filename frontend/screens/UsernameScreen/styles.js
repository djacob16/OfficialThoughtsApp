import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70
    },
    nextButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.backgroundColor,
    },
    loadingContainer: {
        position: "absolute",
        width: 95,
        height: 55,
        top: 350,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styles