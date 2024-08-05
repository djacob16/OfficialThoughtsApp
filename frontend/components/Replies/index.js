import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNearbyReplies } from "../../slices/getNearbyReplies";
import { useState, useEffect } from "react";
import defaultProfilePic from "../../assets/defaultprofilepic.png";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import styles from './styles'
import Reply from "../Reply";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import * as subscriptions from '../../src/graphql/subscriptions';
import { listRepliesWithAuthor } from "../../utils/customQueries";
import onNewReply from "../../subscriptions/subscribeToNewReply";

const Replies = ({ parentComment }) => {
    const [nearbyReplies, setNearbyReplies] = useState([]);

    useEffect(() => {
        const getReplies = async (parentComment) => {
            const client = generateClient()
            const { userId } = await getCurrentUser();
            console.log(parentComment.id)
            try {
                const response = await client.graphql({
                    query: listRepliesWithAuthor,
                    variables: {
                        filter: {
                            commentRepliesId: { eq: parentComment.id }
                        }
                    }
                })
                console.log("Nearby replies: ", response.data.listReplies.items)
                const repliesList = response.data.listReplies.items;
                const sortedReplies = repliesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                setNearbyReplies(sortedReplies);
            } catch (error) {
                console.log("error fetching replies: ", error)
            }
        }
        getReplies(parentComment)
    }, [])

    useEffect(() => {
        const client = generateClient();
        const repliesSubscription = client.graphql({
            query: subscriptions.onCreateReply,
        }).subscribe({
            next: async () => {
                try {
                    const response = await client.graphql({
                        query: listRepliesWithAuthor,
                        variables: {
                            filter: {
                                commentRepliesId: { eq: parentComment.id }
                            }
                        }
                    })
                    console.log("Nearby replies: ", response.data.listReplies.items)
                    const repliesList = response.data.listReplies.items;
                    const sortedReplies = repliesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    setNearbyReplies(sortedReplies)
                } catch (error) {
                    console.log("error fetching replies: ", error)
                }
            },
            error: (error) => console.warn(error)
        })

        return () => {
            repliesSubscription.unsubscribe();
        }
    }, [parentComment])


    return (
        <View>
            {nearbyReplies?.map((reply, index) => (
                <Reply reply={reply} key={index} />
            ))}
        </View>
    )
}

export default Replies;