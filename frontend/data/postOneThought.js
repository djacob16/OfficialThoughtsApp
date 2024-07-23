import { createThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { fetchUserAttributes } from "@aws-amplify/auth";

const postThought = async (content, active, parked, location, anonymous) => {
    console.log("content: ", content);
    const client = generateClient();
    const { userId } = await getCurrentUser();
    const user = await fetchUserAttributes();
    try {
        const thoughtResult = (await client.graphql({
            query: createThought,
            variables: {
                input: {
                    content: content,
                    active: active,
                    parked: parked,
                    author: userId,
                    likes: 0,
                    latitude: location[0],
                    longitude: location[1],
                    anonymous: anonymous,
                }
            }
        })).data;
        console.log("thought: ", thoughtResult);
        return thoughtResult;
    } catch (error) {
        console.log(error.errors);
    }
}

export default postThought;