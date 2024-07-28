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
        longitude
        latitude
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