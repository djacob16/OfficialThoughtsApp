import { listThoughtLikes } from "../src/graphql/queries";
import { listNearbyThoughtsWithAuthor } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { listThoughtLikesWithUser, listCommentsWithAuthor, listCommentLikesWithUser } from "../utils/customQueries";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLikesForThought = async (thoughtId) => {
    const client = generateClient();
    try {
        let lastUpdatedTime = await AsyncStorage.getItem("lastUpdated");
        console.log("lastUpdatedTime: ", lastUpdatedTime)

        if (!lastUpdatedTime) {
            // Use the Unix epoch time if no lastUpdatedTime is found
            lastUpdatedTime = new Date(0).toISOString();
            console.log("DEFAULT DATE:", lastUpdatedTime);
        } else {
            // Ensure lastUpdatedTime is a valid date
            lastUpdatedTime = new Date(Number(lastUpdatedTime)).toISOString();
            console.log("NEW DATE:", lastUpdatedTime);
        }

        const thoughtLikes = (await client.graphql({
            query: listThoughtLikesWithUser,
            variables: {
                filter: {
                    createdAt: { gt: lastUpdatedTime },
                    thoughtID: { eq: thoughtId }
                }
            }
        })).data.listThoughtLikes.items;
        return thoughtLikes;

    } catch (error) {
        console.error("Error fetching likes:", error);
        return [];
    }
};

export const getCommentsForThought = async (thoughtId) => {
    const client = generateClient();
    try {
        let lastUpdatedTime = await AsyncStorage.getItem("lastUpdated");

        if (!lastUpdatedTime) {
            // Use the Unix epoch time if no lastUpdatedTime is found
            lastUpdatedTime = new Date(0).toISOString();
            console.log("DEFAULT DATE:", lastUpdatedTime);
        } else {
            // Ensure lastUpdatedTime is a valid date
            lastUpdatedTime = new Date(Number(lastUpdatedTime)).toISOString();
            console.log("NEW DATE:", lastUpdatedTime);
        }

        const comments = (await client.graphql({
            query: listCommentsWithAuthor,
            variables: {
                filter: {
                    createdAt: { gt: lastUpdatedTime },
                    thoughtCommentsId: { eq: thoughtId }
                }
            }
        })).data.listComments.items;
        return comments;

    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};



// export const getLikesForComment = async (commentId) => {
//     const client = generateClient();
//     let lastUpdatedTime = await AsyncStorage.getItem("lastUpdated");
//     if (!lastUpdatedTime) {
//         lastUpdatedTime = new Date(0).toISOString();
//     } else {
//         lastUpdatedTime = new Date(parseInt(lastUpdatedTime)).toISOString();
//     }
//     try {
//         const commentLikes = (await client.graphql({
//             query: listCommentLikesWithUser,
//             variables: {
//                 filter: {
//                     createdAt: { gt: lastUpdatedTime },
//                     commentID: { eq: commentId }
//                 }
//             }
//         }))
//     } catch (error) {
//         console.log(error.message)
//     } finally {
//         await AsyncStorage.setItem("lastUpdated", Date.now().toString());
//     }
// }