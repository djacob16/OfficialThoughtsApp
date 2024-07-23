import { generateClient } from "aws-amplify/api"
import { createUser } from "../src/graphql/mutations"
import { getCurrentUser } from "@aws-amplify/auth";

const createOneUser = async () => {
    const { userId } = await getCurrentUser()
    const client = generateClient();
    const response = (await client.graphql({
        query: createUser,
        variables: {
            input: {
                id: userId,
                darkmode: true,
                photo: "",
                phoneVerified: false,
                totalThoughts: 0,
                about: "",
            }
        }
    })).data.createUser;
    return response;
}

export default createOneUser