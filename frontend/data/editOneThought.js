import { updateThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";

const editOneThought = async (id, content, active, parked, anonymous) => {
    const client = generateClient();
    try {
        const edit = (await client.graphql({
            query: updateThought,
            variables: {
                input: {
                    id: id,
                    ...(content && { content: content }),
                    active,
                    parked,
                    anonymous
                }
            }
        })).data.updateThought
        return edit;
    } catch (error) {
        console.log(error);
    }
}

export default editOneThought;