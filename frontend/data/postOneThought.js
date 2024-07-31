import { createThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import geohash from "ngeohash";
import { updateUser } from "../src/graphql/mutations";

const postThought = async (content, active, parked, longitude, latitude, anonymous, user) => {
    const client = generateClient();
    const { userId } = await getCurrentUser();
    console.log("user: ", user);
    const hash = geohash.encode(latitude, longitude, 9)
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
                    active: active,
                    parked: parked,
                    longitude: longitude,
                    latitude: latitude,
                    geohash: hash,
                    likes: 0,
                    anonymous: anonymous,
                }
            }
        });
        console.log("updatedUser: ", updatedUser)
        console.log("new thought: :", thoughtResult.data.createThought)
        return thoughtResult.data.createThought;
    } catch (error) {
        console.error("Error creating thought:", error.errors);
        throw error;
    }
}

export default postThought;