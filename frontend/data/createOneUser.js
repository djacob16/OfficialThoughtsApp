import { generateClient } from "aws-amplify/api"
import { createUser } from "../src/graphql/mutations"
import { getCurrentUser } from "@aws-amplify/auth";
import { fetchUserAttributes } from "@aws-amplify/auth";

const createOneUser = async (username) => {
    const { userId } = await getCurrentUser()
    const userAttributes = await fetchUserAttributes();
    const client = generateClient();
    try {
        if (userId) {
            const response = (await client.graphql({
                query: createUser,
                variables: {
                    input: {
                        id: userId,
                        photo: "https://thoughtsapp8fd738644ed04b61a716a9444c7fe4fb83473-staging.s3.us-east-2.amazonaws.com/public/profilePictures/1724096951336-photo.jpg",
                        name: userAttributes.name + " " + userAttributes.family_name,
                        displayName: username,
                        about: "",
                        totalThoughts: 0,
                        darkmode: true,
                    }
                }
            })).data.createUser;
            return response;
        } else {
            console.log("no user id: ", userId)
        }
    } catch (error) {
        console.log("Error creating user: ", error);
        if (error.errors) {
            error.errors.forEach(e => console.log("GraphQL error:", e.message));
        }
        if (error.networkError) {
            console.log("Network error:", error.networkError);
        }
    }
}

export default createOneUser