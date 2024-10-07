import { generateClient } from "aws-amplify/api";
import { getUser } from "../src/graphql/queries";

export const getUserById = async (userId) => {
    const client = generateClient()
    try {
        const response = await client.graphql({
            query: getUser,
            variables: {
                id: userId
            }
        })
        const user = response.data.getUser;
        return !!user;
    } catch (error) {
        console.log("error getting user by id: ", error)
    }
}