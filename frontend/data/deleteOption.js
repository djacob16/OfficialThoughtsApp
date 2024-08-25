import { deleteOption, deletePollAnswers } from "../src/graphql/mutations"
import { getCurrentUser } from "@aws-amplify/auth"
import { generateClient } from "aws-amplify/api"

const client = generateClient()

export const deleteOneOption = async (optionId) => {
    try {
        const deletedOption = (await client.graphql({
            query: deleteOption,
            variables: {
                input: {
                    id: optionId
                }
            }
        })).data.deleteOption
        console.log(deletedOption)
        return deletedOption
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswers = async (thoughtId) => {
    const { userId } = await getCurrentUser()
    try {
        const deletedAnswer = (await client.graphql({
            query: deletePollAnswers,
            variables: {
                input: {
                    thoughtID: thoughtId,
                    userID: userId
                }
            }
        })).data.deletePollAnswers
        console.log(deletedAnswer)
        return deletedAnswer
    } catch (error) {
        console.log(error)
    }
}
