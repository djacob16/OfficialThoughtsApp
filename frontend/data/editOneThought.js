import { updateThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";

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
        console.log(edit)
        return edit;
    } catch (error) {
        console.log(error);
    }
}

export default editOneThought;