/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateThought = /* GraphQL */ `
  subscription OnCreateThought($filter: ModelSubscriptionThoughtFilterInput) {
    onCreateThought(filter: $filter) {
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
export const onUpdateThought = /* GraphQL */ `
  subscription OnUpdateThought($filter: ModelSubscriptionThoughtFilterInput) {
    onUpdateThought(filter: $filter) {
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
export const onDeleteThought = /* GraphQL */ `
  subscription OnDeleteThought($filter: ModelSubscriptionThoughtFilterInput) {
    onDeleteThought(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
