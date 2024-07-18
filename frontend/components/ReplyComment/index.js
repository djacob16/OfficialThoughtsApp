import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

import styles from "./styles";

const ReplyComment = ({ parentComment, displayCount }) => {
    const [replies, setReplies] = useState([]);
    const [currentDisplayCount, setCurrentDisplayCount] = useState(displayCount);

    const getReplies = async () => {
        try {
            const fetchedReplies = await axios.get(`http://localhost:4000/endpoints/comments/repliesOnComment/${parentComment._id}`);
            setReplies(fetchedReplies.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getReplies();
    }, []);

    useEffect(() => {
        setCurrentDisplayCount(displayCount);
    }, [displayCount]);

    const handleSeeMore = () => {
        setCurrentDisplayCount(prevCount => prevCount + 5);
    };

    return (
        <View>
            {replies.slice(0, currentDisplayCount).map((reply) => (
                <Text key={reply._id} style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
                    {reply.authorUsername}: {reply.content}
                </Text>
            ))}
            {currentDisplayCount < replies.length && (
                <TouchableOpacity onPress={handleSeeMore}>
                    <Text style={{ color: "yellow" }}>See more</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ReplyComment;