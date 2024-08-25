import { listNearbyThoughtsWithAuthor } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";

const listThoughtsByAuthor = async (id) => {
    const client = generateClient();
    try {
        const response = await client.graphql({
            query: listNearbyThoughtsWithAuthor,
            variables: {
                filter: {
                    authorID: {
                        eq: id
                    },
                    and: [
                        { anonymous: { eq: false } },
                        { active: { eq: true } }
                    ],
                }
            }
        })
        const listThoughts = response.data.listThoughts.items;
        const sortedThoughts = listThoughts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        return sortedThoughts
    } catch (error) {
        console.log(error.message);
    }
}

export default listThoughtsByAuthor;