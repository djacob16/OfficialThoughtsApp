// export const onCreateThoughtLikeForAuthor = /* GraphQL */ `
//   subscription OnCreateThoughtLikeForAuthor($authorID: String!) {
//     onCreateThoughtLike(filter: {
//         originalAuthorID: {
//           eq: $authorID
//         }
//     }) {
//       thoughtID
//       thought {
//         id
//         authorID
//         content
//         likes
//         totalReplies
//         createdAt
//         updatedAt
//       }
//       userID
//       user {
//         id
//         name
//         displayName
//       }
//       createdAt
//     }
//   }
// `;