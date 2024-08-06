import { createComment } from '../src/graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from '@aws-amplify/auth';
import { fetchUserAttributes } from '@aws-amplify/auth';

const createOneComment = async (thought, comment) => {

    const client = generateClient();
    const { userId } = await getCurrentUser();
    try {
        const commentResponse = (await client.graphql({
            query: createComment,
            variables: {
                input: {
                    authorID: userId,
                    content: comment,
                    likes: 0,
                    anonymous: thought.anonymous,
                    thoughtCommentsId: thought.id,
                }
            }
        })).data
        console.log("new comment: ", commentResponse)
        return commentResponse;
    } catch (err) {
        console.log(err.message);
    }
}

export default createOneComment;