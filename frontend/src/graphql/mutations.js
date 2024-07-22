/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      createdAt
      darkmode
      socials
      id
      photo
      updatedAt
      username
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      createdAt
      darkmode
      socials
      id
      photo
      updatedAt
      username
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      createdAt
      darkmode
      socials
      id
      photo
      updatedAt
      username
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
export const createThought = /* GraphQL */ `
  mutation CreateThought(
    $input: CreateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    createThought(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      active
      parked
      location {
        longitude
        latitude
        __typename
      }
      expireAt
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
export const updateThought = /* GraphQL */ `
  mutation UpdateThought(
    $input: UpdateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    updateThought(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      active
      parked
      location {
        longitude
        latitude
        __typename
      }
      expireAt
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
export const deleteThought = /* GraphQL */ `
  mutation DeleteThought(
    $input: DeleteThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    deleteThought(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      active
      parked
      location {
        longitude
        latitude
        __typename
      }
      expireAt
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
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
      createdAt
      updatedAt
      thoughtCommentsId
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
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
      createdAt
      updatedAt
      thoughtCommentsId
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
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
      createdAt
      updatedAt
      thoughtCommentsId
      __typename
    }
  }
`;
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      likes
      anonymous
      createdAt
      updatedAt
      commentRepliesId
      __typename
    }
  }
`;
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      likes
      anonymous
      createdAt
      updatedAt
      commentRepliesId
      __typename
    }
  }
`;
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
      id
      content
      author {
        createdAt
        darkmode
        socials
        id
        photo
        updatedAt
        username
        phoneVerified
        totalThoughts
        about
        __typename
      }
      likes
      anonymous
      createdAt
      updatedAt
      commentRepliesId
      __typename
    }
  }
`;
