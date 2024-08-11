import { generateClient } from "aws-amplify/api";
import { listThoughts } from "../src/graphql/queries";
import { getCurrentUser } from "@aws-amplify/auth";
import { updateThought } from "../src/graphql/mutations";

export const updateActiveUnparkedThoughts = async (hash) => {
    const client = generateClient()
    const { userId } = await getCurrentUser();
    const response = (await client.graphql({
        query: listThoughts,
        variables: {
            filter: {
                authorID: { eq: userId },
                and: {
                    active: { eq: true },
                    parked: { eq: false }
                }
            },
        }
    })).data.listThoughts.items
    for (const thought of response) {
        if (thought) {
            try {
                const updatedThought = await client.graphql({
                    query: updateThought,
                    variables: {
                        input: {
                            id: thought.id,
                            geohash: hash
                        }
                    }
                })
                return updatedThought.data.updateThought
            } catch (error) {
                console.log("error updating geohash of thought: ", error)
            }
        }
    }
    return response;
}