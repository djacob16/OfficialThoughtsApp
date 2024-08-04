import { generateClient } from "aws-amplify/api";
import { getComment, getCommentLike } from "../src/graphql/queries";
import { updateComment, createCommentLike, deleteCommentLike } from "../src/graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient();

export const likeComment = async (comment, like) => {
    const { userId } = await getCurrentUser()

    // get current like count
    const currentLikeCount = (await client.graphql({
        query: getComment,
        variables: {
            id: comment.id
        }
    })).data.getComment.likes;

    if (like) {
        try {
            const updatedComment = (await client.graphql({
                query: updateComment,
                variables: {
                    input: {
                        id: comment.id,
                        likes: currentLikeCount + 1
                    }
                }
            })).data.updateComment;
            const likeEntry = (await client.graphql({
                query: createCommentLike,
                variables: {
                    input: {
                        commentID: comment.id,
                        userID: userId
                    }
                }
            }))
            console.log("updated comment thought response: ", updatedComment)
            console.log("like Entry for comment: ", likeEntry)
            return updatedComment
        } catch (error) {
            console.log("error here: ", error)
        }
    } else {
        try {
            const updatedComment = (await client.graphql({
                query: updateComment,
                variables: {
                    input: {
                        id: comment.id,
                        likes: currentLikeCount - 1
                    }
                }
            })).data.updateComment;
            const deletedLikeEntry = (await client.graphql({
                query: deleteCommentLike,
                variables: {
                    input: {
                        commentID: comment.id,
                        userID: userId,
                    }
                }
            }))
            console.log("updated Disliked Commment: ", updatedComment)
            console.log("deleted Like Entry for comment: ", deletedLikeEntry)
            return updatedComment
        } catch (error) {
            console.log(error)
        }
    }
}

export const checkLiked = async (comment) => {
    const { userId } = await getCurrentUser();
    try {
        const response = await client.graphql({
            query: getCommentLike,
            variables: {
                userID: userId,
                commentID: comment.id,
            }
        });
        const like = response.data.getCommentLike;
        c
        return !!like;
    } catch (error) {
        console.log(error)
        return false;
    }
}
