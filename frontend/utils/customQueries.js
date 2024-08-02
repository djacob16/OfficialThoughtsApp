// PURPOSE: To be able to fetch the id, photo, and displayName of the author all in one call
export const listNearbyThoughtsWithAuthor = /* GraphQL */ `
  query listNearbyThoughtsWithAuthor(
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThoughts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorID
        content
        active
        parked
        geohash
        likes
        anonymous
        createdAt
        updatedAt
        author {
          id
          photo
          displayName
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;


export const listCommentsWithAuthor = /* GraphQL */ `
  query listCommentsWithAuthor(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorID
        author {
          id
          photo
          displayName
        }
        content
        likes
        anonymous
        createdAt
        updatedAt
        userCommentsId
        thoughtCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
