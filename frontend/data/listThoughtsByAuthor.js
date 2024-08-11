import { listThoughtsWithAuthor } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";

const listThoughtsByAuthor = async (id) => {
    const client = generateClient();
    try {
        const response = await client.graphql({
            query: listThoughtsWithAuthor,
            variables: {
                filter: {
                    authorID: {
                        eq: id
                    }
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