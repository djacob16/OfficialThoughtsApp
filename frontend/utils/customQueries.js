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

// PURPOSE: To be able to fetch the id, photo, and displayName of the author all in one call
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
        thought {
          id
          author {
            displayName
            photo
          }
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

// PURPOSE: To be able to fetch the id, photo, and displayName of the author all in one call
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
        comment {
          id
          author {
            displayName
            photo
          }
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
// PURPOSE: To be able to fetch the id, photo, and displayName of the author all in one call
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
        originalAuthorID
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
// PURPOSE: To be able to fetch the id, photo, and displayName of the author all in one call
export const listCommentLikesWithUser = /* GraphQL */ `
  query ListCommentLikes(
    $commentID: ID
    $userID: ModelIDKeyConditionInput
    $filter: ModelCommentLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommentLikes(
      commentID: $commentID
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        commentID
        comment {
          id
          content
          thought {
            id
          }
          likes
        }
        userID
        user {
          id
          photo
          displayName
        }
        originalAuthorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// PURPOSE: List users with their comments and replies
export const listUsersWithCommentsAndReplies = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        photo
        displayName
        comments {
          items {
            content
          }
        }
        replies {
          items {
            content
          }
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
