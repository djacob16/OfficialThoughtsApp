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
        return { status: "success" }
    } catch (error) {
        console.log(error)
        return { status: "failed" }
    }
}

export default deleteOneThought;