import { generateClient } from "aws-amplify/api";
import { getThought } from "../src/graphql/queries";
import { updateThought, createThoughtLike, deleteThoughtLike } from "../src/graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient();

export const likeThought = async (thoughtID, like) => {
    const { userId } = await getCurrentUser()

    // get current like count
    const currentLikeCount = (await client.graphql({
        query: getThought,
        variables: {
            id: thoughtID
        }
    })).data.getThought.likes;

    if (like) {
        try {
            const updatedThought = (await client.graphql({
                query: updateThought,
                variables: {
                    input: {
                        id: thoughtID,
                        likes: currentLikeCount + 1
                    }
                }
            })).data.updateThought;
            const likeEntry = (await client.graphql({
                query: createThoughtLike,
                variables: {
                    input: {
                        thoughtID: thoughtID,
                        userID: userId
                    }
                }
            }))
            console.log("updated Liked Thought: ", updatedThought)
            console.log("like Entry: ", likeEntry)
        } catch (error) {
            console.log("error here: ", error)
        }
    } else {
        try {
            const updatedThought = (await client.graphql({
                query: updateThought,
                variables: {
                    input: {
                        id: thoughtID,
                        likes: currentLikeCount - 1
                    }
                }
            })).data.updateThought;
            const deletedLikeEntry = (await client.graphql({
                query: deleteThoughtLike,
                variables: {
                    input: {
                        thoughtID: thoughtID,
                        userID: userId,
                    }
                }
            }))
            console.log("updated Disliked Thought: ", updatedThought)
            console.log("deleted Like Entry: ", deletedLikeEntry)
        } catch (error) {
            console.log(error)
        }
    }
}
