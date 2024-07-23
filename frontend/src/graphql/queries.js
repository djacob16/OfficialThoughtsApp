/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoint = /* GraphQL */ `
  query GetPoint($id: ID!) {
    getPoint(id: $id) {
      longitude
      latitude
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPoints = /* GraphQL */ `
  query ListPoints(
    $filter: ModelPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        longitude
        latitude
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      createdAt
      darkmode
      socials
      id
      photo
      updatedAt
      phoneVerified
      totalThoughts
      thoughts {
        nextToken
        __typename
      }
      about
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
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        phoneVerified
        totalThoughts
        about
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
      content
      author
      active
      parked
      location {
        longitude
        latitude
        id
        createdAt
        updatedAt
        __typename
      }
      likes
      anonymous
      comments {
        nextToken
        __typename
      }
      id
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
        content
        author
        active
        parked
        likes
        anonymous
        id
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
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        phoneVerified
        totalThoughts
        about
        __typename
      }
      likes
      anonymous
      replies {
        nextToken
        __typename
      }
      id
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
        content
        likes
        anonymous
        id
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
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        phoneVerified
        totalThoughts
        about
        __typename
      }
      likes
      anonymous
      id
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
        content
        likes
        anonymous
        id
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
