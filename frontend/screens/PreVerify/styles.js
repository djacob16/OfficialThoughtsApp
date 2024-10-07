import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 30,
        fontWeight: "700",
        color: Colors.whiteFont,
        textAlign: "center",
        marginBottom: 10
    },
    art: {
        alignSelf: "center",
        marginLeft: 30,
        width: 298,
        height: 352,
        marginBottom: 20
    },
    subTitle: {
        fontSize: 20,
        paddingHorizontal: 30,
        fontWeight: "400",
        color: Colors.whiteFont,
        textAlign: "center",
        marginBottom: 75
    }
})

export default styles;