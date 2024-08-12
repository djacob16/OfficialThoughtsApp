import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    headerContainer: {
        flexDirection: "row",
        borderBottomWidth: .5,
        borderBottomColor: Colors.grayFont,
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 16
    },
    bodyContainer: {
        width: "100%",
        paddingHorizontal: 16
    },
    headerText: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: "500"
    },
    cancleText: {
        color: Colors.whiteFont,
        fontSize: 15
    },
    inputBottomLeftContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 12,
        justifyContent: "space-between",
        alignItems: "center"
    },
    icon: {
        width: 18,
        height: 18
    },
    input: {
        marginTop: 25,
        color: Colors.whiteFont
    },
    anonymous: {
        color: Colors.yellowFont
    },
    notAnonymous: {
        color: Colors.whiteFont
    },
    editButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25
    },

})

export default styles;