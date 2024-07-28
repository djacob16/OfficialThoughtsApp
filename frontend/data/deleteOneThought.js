import { deleteThought } from "../src/graphql/mutations";
import { generateClient } from "aws-amplify/api";

const deleteOneThought = async (thoughtId) => {
    const client = generateClient();
    try {
        const deletedThought = await client.graphql({
            query: deleteThought,
            variables: {
                input: {
                    id: thoughtId
                }
            }
        })
        return deleteThought;
    } catch (error) {
        console.log(error)
    }
}

export default deleteOneThought;