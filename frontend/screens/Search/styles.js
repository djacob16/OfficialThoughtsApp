import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 70
    },
    searchContainer: {
        fontSize: 35,
        fontWeight: "600",
        color: "#FFF",
        width: "100%",
    },
    searchInputContainer: {
        height: 45,
        alignItems: "center",
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    textInputContainer: {
        height: "100%",
        backgroundColor: Colors.sectionGrey,
        borderRadius: 15,
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    searchIcon: {
        position: "absolute",
        left: 10,
        width: 30,
        height: 30,
    },
    input: {
        height: "100%",
        width: '100%',
        color: "white",
        paddingLeft: 24
    },
    textInputFocused: {
        height: "100%",
        width: '100%',
        color: "white",
        paddingLeft: 24
    },
    userProfilesContainer: {
        paddingHorizontal: 16,
        marginTop: 10,

        gap: 10
    },
    userProfile: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingVertical: 15,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: .5,
    }
});

export default styles;