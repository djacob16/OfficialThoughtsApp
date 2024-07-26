import { updateThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";

const editOneThought = async (content, active, parked, anonymous) => {
    const client = generateClient();
    try {
        const edit = (await client.graphql({
            query: updateThought,
            variables: {
                input: {
                    ...(content && { content: content }),
                    ...(active && { active: active }),
                    ...(parked && { parked: parked }),
                    ...(anonymous && { anonymous: anonymous })
                }
            }
        })).data.updateThought
    } catch (error) {
        console.log(error);
    }
}

export default editOneThought;