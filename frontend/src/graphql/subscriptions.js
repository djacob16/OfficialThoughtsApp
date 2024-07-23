/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePoint = /* GraphQL */ `
  subscription OnCreatePoint($filter: ModelSubscriptionPointFilterInput) {
    onCreatePoint(filter: $filter) {
      longitude
      latitude
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePoint = /* GraphQL */ `
  subscription OnUpdatePoint($filter: ModelSubscriptionPointFilterInput) {
    onUpdatePoint(filter: $filter) {
      longitude
      latitude
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePoint = /* GraphQL */ `
  subscription OnDeletePoint($filter: ModelSubscriptionPointFilterInput) {
    onDeletePoint(filter: $filter) {
      longitude
      latitude
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateThought = /* GraphQL */ `
  subscription OnCreateThought($filter: ModelSubscriptionThoughtFilterInput) {
    onCreateThought(filter: $filter) {
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
export const onUpdateThought = /* GraphQL */ `
  subscription OnUpdateThought($filter: ModelSubscriptionThoughtFilterInput) {
    onUpdateThought(filter: $filter) {
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
export const onDeleteThought = /* GraphQL */ `
  subscription OnDeleteThought($filter: ModelSubscriptionThoughtFilterInput) {
    onDeleteThought(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
