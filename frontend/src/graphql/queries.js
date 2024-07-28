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
      darkmode
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
        createdAt
        updatedAt
        __typename
      }
      content
      active
      parked
      longitude
      latitude
      geohash
      likes
      anonymous
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        active
        parked
        longitude
        latitude
        geohash
        likes
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
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      author {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        createdAt
        updatedAt
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
        content
        likes
        anonymous
        createdAt
        updatedAt
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
      author {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        createdAt
        updatedAt
        __typename
      }
      content
      likes
      anonymous
      createdAt
      updatedAt
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
        content
        likes
        anonymous
        createdAt
        updatedAt
        commentRepliesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const thoughtsByAuthorID = /* GraphQL */ `
  query ThoughtsByAuthorID(
    $authorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    thoughtsByAuthorID(
      authorID: $authorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        active
        parked
        longitude
        latitude
        geohash
        likes
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
