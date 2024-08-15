import { View, Text, Image } from "react-native";
import styles from "./styles";

const ProfileThought = ({ thought }) => {
    return (
        <>
            {thought.photo && <Image source={{ uri: thought.photo }} style={styles.image} />}
            {!thought.photo && <View style={styles.textContainer}>
                <Text style={styles.content}>{thought.content}</Text>
            </View>}
        </>
    )
}

export default ProfileThought;