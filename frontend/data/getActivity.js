import { listThoughtLikes } from "../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { useSelector } from "react-redux";

const getActivity = async (thoughtId) => {
    const { userId } = await getCurrentUser();
    const client = generateClient();
    try {
        const activity = (await client.graphql({
            query: listThoughtLikes,
            variables: {
                filter: {
                    thoughtID: { eq: thoughtId }
                }
            }
        }))
        return activity.data.listThoughtLikes
    } catch (error) {
        console.log(error.message)
    }
}

export default getActivity;
