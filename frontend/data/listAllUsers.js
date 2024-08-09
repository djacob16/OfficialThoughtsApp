import { generateClient } from "aws-amplify/api"
import { listUsers } from "../src/graphql/queries";

const listAllUsers = async (search) => {
    const client = generateClient();
    try {
        const users = await client.graphql({
            query: listUsers,
            variables: {
                filter: {
                    or: [
                        { displayName: { beginsWith: search.toLowerCase() } },
                        { displayName: { beginsWith: search.charAt(0).toUpperCase() + search.slice(1).toLowerCase() } }
                    ]
                }
            }
        })
        console.log("list users: ", users.data.listUsers.items)
        return users.data.listUsers.items
    } catch (error) {
        console.log("error getting users: ", error)
    }
}

export default listAllUsers;