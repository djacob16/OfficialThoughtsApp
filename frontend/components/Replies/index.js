import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNearbyReplies } from "../../slices/getNearbyReplies";
import { useEffect } from "react";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import styles from './styles'
import Reply from "../Reply";

const Replies = () => {
    const { nearbyReplies } = useSelector((state) => state.getNearbyRepliesSlice)

    return (
        <View>
            {nearbyReplies?.map((reply, index) => (
                <Reply reply={reply} />
            ))}
        </View>
    )
}

export default Replies;