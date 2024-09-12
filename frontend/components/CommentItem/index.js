import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/icon.png"
import { refreshAccessToken } from "../../data/exchangeCodeForToken";
import formatDate from "../../data/formatDate";

const CommentItem = ({ item }) => {
    const [loadingPic, setLoadingPic] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <FastImage source={{ uri: item?.author?.photo }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </View>
            <View style={styles.midContainer}>
                <Text style={styles.likedText}>
                    <Text style={styles.likedTextBold}>{item?.author?.displayName}</Text> commented:
                </Text>
                {item?.content && (
                    <Text style={styles.contentText}>
                        {item.content.length > 50
                            ? `"${item.content.substring(0, 50)}..."`
                            : `"${item.content}"`
                        }
                    </Text>
                )}
                <Text style={styles.date}>{formatDate(item.createdAt)} ago</Text>
            </View>
            {/* <View style={styles.optionalPhotoContainer}>
                <Image source={logo} style={{ width: 50, height: 50, borderRadius: 8 }} />
            </View> */}
        </View>
    );
};

export default CommentItem;
