import { createOption } from "../src/graphql/mutations"
import { generateClient } from "aws-amplify/api"

const client = generateClient()

export const createNewOption = async (option, postId) => {
    try {
        const newOption = (await client.graphql({
            query: createOption,
            variables: {
                input: {
                    content: option,
                    votes: 0,
                    thoughtOptionsId: postId
                }
            }
        })).data.createOption
        console.log(newOption)
        return newOption
    } catch (error) {
        console.log(error)
    }
}
