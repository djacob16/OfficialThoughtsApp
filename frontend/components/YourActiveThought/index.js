import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles"

const YourActiveThought = ({ activeThought }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>{activeThought.content}</Text>
        </View>
    )
}

export default YourActiveThought;