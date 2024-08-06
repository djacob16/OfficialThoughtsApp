import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { createReply } from "../src/graphql/mutations";

const replyOnComment = async (parentComment, content) => {
    const client = generateClient()
    const { userId } = await getCurrentUser();
    try {
        const response = await client.graphql({
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
        })
        console.log("new reply: ", response.data.createReply)
        return response.data.createReply;
    } catch (error) {
        console.log("error replying to a comment: ", error)
    }
}

export default replyOnComment;