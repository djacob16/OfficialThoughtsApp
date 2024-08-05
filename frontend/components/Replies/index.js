import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNearbyReplies } from "../../slices/getNearbyReplies";
import { useEffect } from "react";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import styles from './styles'

const Replies = () => {
    const { nearbyReplies } = useSelector((state) => state.getNearbyRepliesSlice)
    console.log("test: ", nearbyReplies)

    return (
        <View>
            {nearbyReplies?.map((reply, index) => (
                <View style={styles.commentContainer} key={index}>
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
                        {/* <View style={styles.thoughtInteractions}>
                            <TouchableOpacity>
                                <Image
                                    source={heartIcon}
                                    style={styles.icon}
                                />
                                <Text style={styles.number}>0</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                </View>
            ))}
        </View>

    )
}

export default Replies;