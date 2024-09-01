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
        if (!lastUpdatedTime) {
            lastUpdatedTime = new Date(0).toISOString();
        } else {
            lastUpdatedTime = new Date(parseInt(lastUpdatedTime)).toISOString();
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
        console.log("THOUGH LIKESSSSS: ", thoughtLikes)
        return thoughtLikes;

    } catch (error) {
        console.log(error.message);

    }
};


export const getCommentsForThought = async (thoughtId) => {
    const client = generateClient();
    try {
        let lastUpdatedTime = await AsyncStorage.getItem("lastUpdated");
        if (!lastUpdatedTime) {
            lastUpdatedTime = new Date(0).toISOString();
        } else {
            lastUpdatedTime = new Date(parseInt(lastUpdatedTime)).toISOString();
        }
        console.log("Last updated time: ", lastUpdatedTime);

        const comments = (await client.graphql({
            query: listCommentsWithAuthor,
            variables: {
                filter: {
                    createdAt: { gt: lastUpdatedTime },
                    thoughtCommentsId: { eq: thoughtId }
                }
            }
        })).data.listComments.items;
        console.log("Fetched comments: ", comments);
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