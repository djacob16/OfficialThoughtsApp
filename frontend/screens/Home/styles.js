import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.backgroundColor,
    },
    video: {
        width: "100%",
        flex: 1
    },
    overLay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
    }
})

export default styles;