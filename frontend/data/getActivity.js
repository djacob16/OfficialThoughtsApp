import { listThoughtLikes } from "../src/graphql/queries";
import { listNearbyThoughtsWithAuthor } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";

const getActivity = async (thoughtId) => {
    const { userId } = await getCurrentUser();
    const client = generateClient();
    try {
        const response = await client.graphql({
            query: listNearbyThoughtsWithAuthor,
            variables: {
                filter: {
                    authorID: { eq: userId },
                    and: {
                        active: { eq: true }
                    },
                }
            }
        });
        const thoughtsList = response.data.listThoughts.items;
        const sortedThoughts = thoughtsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        // console.log("active thoughts")
        return sortedThoughts;
    } catch (error) {
        console.log(error);
    }

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
