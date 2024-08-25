import { createComment, updateThought } from '../src/graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from '@aws-amplify/auth';
import { getThought } from '../src/graphql/queries';

const client = generateClient();

const createOneComment = async (thought, comment) => {
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

        const currentReplyCount = (await client.graphql({
            query: getThought,
            variables: {
                id: thought.id
            }
        })).data.getThought.totalReplies;
        console.log("current reply count: ", currentReplyCount)

        // updated reply count +1
        const updateThoughtReplyCount = (await client.graphql({
            query: updateThought,
            variables: {
                input: {
                    id: thought.id,
                    totalReplies: currentReplyCount + 1
                }
            }
        })).data.updateThought.totalReplies
        console.log("updated reply count: ", updateThoughtReplyCount)

        return commentResponse;
    } catch (err) {
        console.log(err.message);
    }
}

export default createOneComment;