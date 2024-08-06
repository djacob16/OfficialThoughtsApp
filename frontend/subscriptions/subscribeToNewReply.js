// import * as subscriptions from '../src/graphql/subscriptions';
// import { generateClient } from "aws-amplify/api";
// import { listRepliesWithAuthor } from '../utils/customQueries';

// const client = generateClient();

// const onNewReply = async (parentComment) => {

//     const repliesSubscription = client.graphql({
//         query: subscriptions.onCreateReply,
//     }).subscribe({
//         next: async () => {
//             try {
//                 const response = await client.graphql({
//                     query: listRepliesWithAuthor,
//                     variables: {
//                         filter: {
//                             commentRepliesId: { eq: parentComment.id }
//                         }
//                     }
//                 })
//                 console.log("Nearby replies: ", response.data.listReplies.items)
//                 const repliesList = response.data.listReplies.items;
//                 const sortedReplies = repliesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//                 return sortedReplies;
//             } catch (error) {
//                 console.log("error fetching replies: ", error)
//             }
//         },
//         error: (error) => console.warn(error)
//     })

//     return () => {
//         repliesSubscription.unsubscribe();
//     }
// }

// export default onNewReply;