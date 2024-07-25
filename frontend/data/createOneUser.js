import { generateClient } from "aws-amplify/api"
import { createUser } from "../src/graphql/mutations"
import { getCurrentUser } from "@aws-amplify/auth";
import { fetchUserAttributes } from "@aws-amplify/auth";

const createOneUser = async (username) => {
    const { userId } = await getCurrentUser()
    const userAttributes = await fetchUserAttributes();
    console.log("user attributes: ", userAttributes);
    const client = generateClient();
    const response = (await client.graphql({
        query: createUser,
        variables: {
            input: {
                id: userId,
                photo: "",
                name: userAttributes.name + " " + userAttributes.family_name,
                displayName: username,
                about: "",
                totalThoughts: 0,
                darkmode: true,
            }
        }
    })).data.createUser;
    return response;
}

export default createOneUser