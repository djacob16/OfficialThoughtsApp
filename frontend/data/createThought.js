// import { createThought } from "../src/graphql/mutations";
// import { generateClient } from "aws-amplify/api";
// import { getCurrentUser } from "@aws-amplify/auth";

// const postThought = async (content) => {
//     console.log("content: ", content);
//     const client = generateClient();
//     const { userId } = await getCurrentUser();
//     try {
//         const thoughtResult = (await client.graphql({
//             query: createThought,
//             variables: {
//                 input: {
//                     content: content,
//                     active: true,
//                     parked: false,
//                     likes: 0,
//                     anonymous: false,
//                     userThoughtsId: userId,
//                 }
//             }
//         })).data.thoughtResult;
//         console.log("thought: ", thoughtResult);
//         return thoughtResult;
//     } catch (err) {
//         console.log("error: ", err);
//         throw err;
//     }
// }

// export default postThought;