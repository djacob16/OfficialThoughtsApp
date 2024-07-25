import { createThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import geohash from "ngeohash";
import { getUser } from "../src/graphql/queries";

const postThought = async (content, active, parked, longitude, latitude, anonymous) => {
    const client = generateClient();
    const { userId } = await getCurrentUser();
    const hash = geohash.encode(latitude, longitude, 9)
    try {
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
        return thoughtResult.data.createThought;
    } catch (error) {
        console.error("Error creating thought:", error.errors);
        throw error;
    }
}

export default postThought;