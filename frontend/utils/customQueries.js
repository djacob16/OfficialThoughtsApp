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
        author {
          id
          photo
          displayName
        }
        content
        photo
        music
        active
        parked
        geohash
        likes
        totalReplies
        poll
        options {
          items {
            id
            content
            votes
          }
        }
        anonymous
        createdAt
        updatedAt
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
        replies {
          items {
            id
          }
        }
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

export const listRepliesWithAuthor = /* GraphQL */ `
  query listRepliesWithAuthor(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        userRepliesId
        commentRepliesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listThoughtLikesWithUser = /* GraphQL */ `
  query ListThoughtLikes(
    $thoughtID: ID
    $userID: ModelIDKeyConditionInput
    $filter: ModelThoughtLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listThoughtLikes(
      thoughtID: $thoughtID
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        thoughtID
        thought {
          id
          authorID
          content
          photo
          music
          active
          parked
          geohash
          likes
          totalReplies
          poll
          options {
            items {
              id
              content
              votes
            }
          }
          anonymous
        }
        userID
        user {
          id
          photo
          displayName
        }
        createdAt
        updatedAt
        userThoughtLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;