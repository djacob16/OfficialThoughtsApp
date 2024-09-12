import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // borderWidth: 1,
        // borderColor: "white",
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        gap: 10,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: .5
    },
    profileContainer: {
        width: "11%",
        alignItems: "center",
    },
    midContainer: {
        width: "72%",
        // borderWidth: 1,
        // borderColor: "red",
        paddingRight: 10,
        justifyContent: "center"
    },
    likedText: {
        color: Colors.whiteFont,
        fontSize: 17,
        paddingBottom: 5
    },
    likedTextBold: {
        color: Colors.whiteFont,
        fontSize: 18,
        fontWeight: "600"
    },
    optionalPhotoContainer: {
        width: "13%",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "blue"
    },
    contentText: {
        paddingLeft: 12,
        color: Colors.grayFont,
        fontSize: 17,
    },
    date: {
        fontSize: 12,
        color: Colors.grayFont,
        marginTop: 10
    },
    subText: {
        fontSize: 13,
        color: Colors.grayFont,
        marginTop: -10,
        paddingBottom: 2
    },
    content: {
        paddingTop: 10,
        color: "white"
    }
})

export default styles;