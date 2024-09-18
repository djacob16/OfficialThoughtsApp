import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import FastImage from "react-native-fast-image";
import { View, Text, Image } from "react-native";
import { getComment, getThought } from "../../src/graphql/queries";
import styles from "./styles";
import formatDate from "../../data/formatDate";

const ReplyItem = ({ item }) => {
    return (
        item.__typename == "Comment" ? (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <FastImage source={{ uri: item?.thought?.author?.photo }} style={{ width: 35, height: 35, borderRadius: 20 }} />
                </View>
                <View style={styles.midContainer}>
                    <Text style={styles.subText}>You commented on</Text>
                    <Text style={styles.likedTextBold}>{item?.thought?.author?.displayName}</Text>
                    <Text style={styles.content}>"{item?.content}"</Text>
                    <Text style={styles.date}>{formatDate(item.createdAt)} ago</Text>
                </View>
            </View>
        ) : (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <FastImage source={{ uri: item?.comment?.author?.photo }} style={{ width: 35, height: 35, borderRadius: 20 }} />
                </View>
                <View style={styles.midContainer}>
                    <Text style={styles.subText}>You replied to</Text>
                    <Text style={styles.likedTextBold}>{item?.comment?.author?.displayName}</Text>
                    <Text style={styles.content}>"{item?.content}"</Text>
                    <Text style={styles.date}>{formatDate(item.createdAt)} ago</Text>
                </View>
            </View>
        )
    )
}


export default ReplyItem