import { View, Text } from "react-native";
import styles from "./styles";

const Grid = () => {
    return (
        <View style={styles.container}>
            <Video source={{ uri: ("../../assets/shortBgVid.mp4") }} muted={true} style={styles.video} rate={.8} />
        </View>
    )
}

export default Grid;