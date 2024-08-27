import { listThoughtLikes } from "../src/graphql/queries";
import { listNearbyThoughtsWithAuthor } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { listThoughtLikesWithUser, listCommentsWithAuthor } from "../utils/customQueries";

// try {
//     const response = await client.graphql({
//         query: listNearbyThoughtsWithAuthor,
//         variables: {
//             filter: {
//                 authorID: { eq: userId },
//                 and: {
//                     active: { eq: true }
//                 },
//             }
//         }
//     });
//     const thoughtsList = response.data.listThoughts.items;
//     const sortedThoughts = thoughtsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//     // console.log("active thoughts")
//     return sortedThoughts;
// } catch (error) {
//     console.log(error);
// }

export const getLikesForThought = async (thoughtId) => {
    const { userId } = await getCurrentUser();
    const client = generateClient();
    try {
        const likes = (await client.graphql({
            query: listThoughtLikesWithUser,
            variables: {
                filter: {
                    thoughtID: { eq: thoughtId }
                }
            }
        })).data.listThoughtLikes.items
        console.log(likes)
        return likes
    } catch (error) {
        console.log(error.message)
    }
}

export const getCommentsForThought = async (thoughtId) => {
    const client = generateClient();
    try {
        const comments = (await client.graphql({
            query: listCommentsWithAuthor,
            variables: {
                filter: {
                    thoughtCommentsId: { eq: thoughtId }
                }
            }
        })).data.listComments.items
        return comments
    } catch (error) {
        console.log(error.message)
    }
}
