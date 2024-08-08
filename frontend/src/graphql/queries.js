/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      photo
      name
      displayName
      about
      totalThoughts
      thoughts {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      replies {
        nextToken
        __typename
      }
      darkmode
      reactions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getThought = /* GraphQL */ `
  query GetThought($id: ID!) {
    getThought(id: $id) {
      id
      authorID
      author {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        createdAt
        updatedAt
        __typename
      }
      content
      photo
      video
      music
      active
      parked
      geohash
      likes
      anonymous
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userThoughtsId
      __typename
    }
  }
`;
export const listThoughts = /* GraphQL */ `
  query ListThoughts(
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThoughts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorID
        content
        photo
        video
        music
        active
        parked
        geohash
        likes
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      authorID
      author {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        createdAt
        updatedAt
        __typename
      }
      thought {
        id
        authorID
        content
        photo
        video
        music
        active
        parked
        geohash
        likes
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      content
      likes
      anonymous
      replies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userCommentsId
      thoughtCommentsId
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorID
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
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
      id
      authorID
      author {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        createdAt
        updatedAt
        __typename
      }
      comment {
        id
        authorID
        content
        likes
        anonymous
        createdAt
        updatedAt
        userCommentsId
        thoughtCommentsId
        __typename
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
  }
`;
export const listReplies = /* GraphQL */ `
  query ListReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorID
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
export const getThoughtLike = /* GraphQL */ `
  query GetThoughtLike($thoughtID: ID!, $userID: ID!) {
    getThoughtLike(thoughtID: $thoughtID, userID: $userID) {
      thoughtID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listThoughtLikes = /* GraphQL */ `
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
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCommentLike = /* GraphQL */ `
  query GetCommentLike($commentID: ID!, $userID: ID!) {
    getCommentLike(commentID: $commentID, userID: $userID) {
      commentID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCommentLikes = /* GraphQL */ `
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
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReplyLike = /* GraphQL */ `
  query GetReplyLike($replyID: ID!, $userID: ID!) {
    getReplyLike(replyID: $replyID, userID: $userID) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReplyLikes = /* GraphQL */ `
  query ListReplyLikes(
    $replyID: ID
    $userID: ModelIDKeyConditionInput
    $filter: ModelReplyLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listReplyLikes(
      replyID: $replyID
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        replyID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const thoughtsByGeoHash = /* GraphQL */ `
  query ThoughtsByGeoHash(
    $geohash: String!
    $sortDirection: ModelSortDirection
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    thoughtsByGeoHash(
      geohash: $geohash
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        authorID
        content
        photo
        video
        music
        active
        parked
        geohash
        likes
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
