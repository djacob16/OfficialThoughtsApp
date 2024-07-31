// import { generateClient } from "aws-amplify/api";
// import { createLikedThoughts } from "../src/graphql/mutations";
// import { getCurrentUser } from "@aws-amplify/auth";

// const createThoughtLike = async () => {
//     const client = generateClient();
//     const { userId } = await getCurrentUser();
//     const response = (await client.graphql({
//         query: createLikedThoughts,
//         input: {
//             userIdr: userId,
//             thoughtId: thoughtId,
//         }
//     }))
// } catch (error) {
//     console.log(error)
// }
// // }