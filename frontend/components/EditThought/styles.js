import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.backgroundColor,
    },
    icon: {
        width: 18,
        height: 18
    },
    anonymousContainer: {
        alignItems: "baseline",
        justifyContent: "center",
        paddingTop: 2
    },
    anonymous: {
        color: Colors.yellowFont,
        fontSize: 12
    },
    notAnonymous: {
        color: Colors.whiteFont,
        fontSize: 12
    }
})

export default styles;