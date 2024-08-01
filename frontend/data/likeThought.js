import { generateClient } from "aws-amplify/api";
import { getThought, getThoughtLike } from "../src/graphql/queries";
import { updateThought, createThoughtLike, deleteThoughtLike } from "../src/graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient();

export const likeThought = async (thought, like) => {
    const { userId } = await getCurrentUser()

    // get current like count
    const currentLikeCount = (await client.graphql({
        query: getThought,
        variables: {
            id: thought.id
        }
    })).data.getThought.likes;

    if (like) {
        try {
            const updatedThought = (await client.graphql({
                query: updateThought,
                variables: {
                    input: {
                        id: thought.id,
                        likes: currentLikeCount + 1
                    }
                }
            })).data.updateThought;
            const likeEntry = (await client.graphql({
                query: createThoughtLike,
                variables: {
                    input: {
                        thoughtID: thought.id,
                        userID: userId
                    }
                }
            }))
            console.log("updated liked thought response: ", updatedThought)
            console.log("like Entry: ", likeEntry)
            return updatedThought
        } catch (error) {
            console.log("error here: ", error)
        }
    } else {
        try {
            const updatedThought = (await client.graphql({
                query: updateThought,
                variables: {
                    input: {
                        id: thought.id,
                        likes: currentLikeCount - 1
                    }
                }
            })).data.updateThought;
            const deletedLikeEntry = (await client.graphql({
                query: deleteThoughtLike,
                variables: {
                    input: {
                        thoughtID: thought.id,
                        userID: userId,
                    }
                }
            }))
            console.log("updated Disliked Thought: ", updatedThought)
            console.log("deleted Like Entry: ", deletedLikeEntry)
            return updatedThought
        } catch (error) {
            console.log(error)
        }
    }
}

export const checkLiked = async (thought) => {
    const { userId } = await getCurrentUser();
    try {
        const response = await client.graphql({
            query: getThoughtLike,
            variables: {
                userID: userId,
                thoughtID: thought.id,
            }
        });
        const like = response.data.getThoughtLike;
        return !!like;
    } catch (error) {
        console.log(error)
        return false;
    }
}
