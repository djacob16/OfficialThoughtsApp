import { View, Text, Image, TouchableOpacity } from "react-native";
import formatDate from "../../data/formatDate";
import styles from "./styles";

const Reply = ({ reply }) => {
    return (
        <View>
            <View style={styles.commentContainer}>
                <View style={styles.profileContainer}>
                    {reply.author.photo ? (
                        <Image source={{ uri: reply.author.photo }} style={{ width: 20, height: 20, borderRadius: 20 }} />
                    ) : (
                        <Image source={defaultProfilePic} style={{ width: 20, height: 20, borderRadius: 20 }} />
                    )}
                </View>
                <View>
                    <View style={styles.thoughtBody}>
                        <View style={styles.userInfo}>
                            {reply.anonymous ? (
                                <Text style={styles.userName}>Anonymous</Text>
                            ) : (
                                <Text style={styles.userName}>{reply?.author?.displayName}</Text>
                            )}
                            <Text style={styles.time}>{formatDate(reply.createdAt)}</Text>
                        </View>
                        <View style={styles.thoughtContent}>
                            <Text style={styles.content}>{reply.content}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Reply;