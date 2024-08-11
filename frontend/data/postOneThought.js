import { createThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { updateUser } from "../src/graphql/mutations";

const postThought = async (content, active, parked, hash, anonymous, user, s3URL) => {
    const client = generateClient();
    const { userId } = await getCurrentUser();
    try {
        const updatedUser = await client.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: userId,
                    totalThoughts: user.totalThoughts + 1,
                }
            }
        })
        const thoughtResult = await client.graphql({
            query: createThought,
            variables: {
                input: {
                    authorID: userId,
                    content: content,
                    photo: s3URL,
                    active: active,
                    parked: parked,
                    geohash: hash,
                    likes: 0,
                    anonymous: anonymous,
                }
            }
        });
        return thoughtResult.data.createThought;
    } catch (error) {
        console.error("Error creating thought:", error.errors);
        throw error;
    }
}

export default postThought;