import { generateClient } from "aws-amplify/api";
import { getReply, getReplyLike } from "../src/graphql/queries";
import { updateReply, createReplyLike, deleteReplyLike } from "../src/graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient();

export const likeReply = async (reply, like) => {
    const { userId } = await getCurrentUser();

    // get current likes for the given reply
    const currentLikeCount = (await client.graphql({
        query: getReply,
        variables: {
            id: reply.id
        }
    })).data.getReply.likes

    if (like) {
        try {
            const updatedReply = (await client.graphql({
                query: updateReply,
                variables: {
                    input: {
                        id: reply.id,
                        likes: currentLikeCount + 1
                    }
                }
            })).data.updateReply
            const likeEntry = (await client.graphql({
                query: createReplyLike,
                variables: {
                    input: {
                        replyID: reply.id,
                        userID: userId
                    }
                }
            }))
            console.log("updated reply response: ", updatedReply)
            console.log("like Entry for reply: ", likeEntry)
            return updatedReply
        } catch (error) {
            console.log("error liking reply: ", error)
        }
    } else {
        try {
            const updatedReply = (await client.graphql({
                query: updateReply,
                variables: {
                    input: {
                        id: reply.id,
                        likes: currentLikeCount - 1
                    }
                }
            })).data.updateReply
            const deletedLikeEntry = (await client.graphql({
                query: deleteReplyLike,
                variables: {
                    input: {
                        replyID: reply.id,
                        userID: userId,
                    }
                }
            }))
            console.log("updated reply thought response: ", updatedReply)
            console.log("deleted like Entry for reply: ", deletedLikeEntry)
            return updatedReply
        } catch (error) {
            console.log("error Disliking reply: ", error)
        }
    }
}


export const checkLiked = async (reply) => {
    const { userId } = await getCurrentUser();
    try {
        const response = (await client.graphql({
            query: getReplyLike,
            variables: {
                userID: userId,
                replyID: reply.id,
            }
        }));
        const like = response.data.getReplyLike;
        return !!like;
    } catch (error) {
        console.log("error checking liked for reply: ", reply);
        return false;
    }
}