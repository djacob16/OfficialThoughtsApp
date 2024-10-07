import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70,
        position: "relative"
    },
    buttonText: {
        color: Colors.whiteFont,
    },
    inputContainer: {
        width: "100%",
        height: 75,
        borderRadius: 10,
        color: Colors.whiteFont,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 10
    },
    input: {
        width: "14%",
        height: 70,
        borderRadius: 16,
        color: Colors.whiteFont,
        textAlign: "center",
        fontSize: 20,
        borderWidth: 2,
        borderColor: "gray",
    },
    subTitle: {
        color: Colors.whiteFont,
        textAlign: "center",
        fontSize: 15
    },
    resend: {
        color: Colors.whiteFont,
        textAlign: "center",
        fontSize: 15,
        textDecorationLine: true
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

export default styles;