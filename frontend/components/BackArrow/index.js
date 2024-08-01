import styles from "./styles";
import backArrow from "../../assets/chevron-left.png"
import { TouchableOpacity, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";

const BackArrow = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
            <Image source={backArrow} style={styles.icon} />
            {/* <Text style={styles.title}>Thought</Text> */}
        </TouchableOpacity>
    )
}

export default BackArrow;