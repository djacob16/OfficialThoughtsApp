import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getThought } from "../src/graphql/queries";
import { createReply, updateThought } from "../src/graphql/mutations";
const client = generateClient()

const replyOnComment = async (parentThought, parentComment, content) => {
    const { userId } = await getCurrentUser();

    try {
        const response = (await client.graphql({
            query: createReply,
            variables: {
                input: {
                    authorID: userId,
                    content: content,
                    likes: 0,
                    anonymous: false,
                    commentRepliesId: parentComment.id,
                }
            }
        })).data.createReply
        console.log("new reply: ", response)

        const currentReplyCount = (await client.graphql({
            query: getThought,
            variables: {
                id: parentThought.id
            }
        })).data.getThought.totalReplies;
        console.log("current reply count: ", currentReplyCount)

        // updated reply count +1
        const updateThoughtReplyCount = (await client.graphql({
            query: updateThought,
            variables: {
                input: {
                    id: parentThought.id,
                    totalReplies: currentReplyCount + 1
                }
            }
        })).data.updateThought.totalReplies
        console.log("updated reply count: ", updateThoughtReplyCount)

        return response;
    } catch (error) {
        console.log("error replying to a comment: ", error)
    }
}

export default replyOnComment;