/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createThought = /* GraphQL */ `
  mutation CreateThought(
    $input: CreateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    createThought(input: $input, condition: $condition) {
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
      audio
      gif
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
export const updateThought = /* GraphQL */ `
  mutation UpdateThought(
    $input: UpdateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    updateThought(input: $input, condition: $condition) {
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
      audio
      gif
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
export const deleteThought = /* GraphQL */ `
  mutation DeleteThought(
    $input: DeleteThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    deleteThought(input: $input, condition: $condition) {
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
      audio
      gif
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
        audio
        gif
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
      gif
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
        audio
        gif
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
      gif
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
        audio
        gif
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
      gif
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
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
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
        gif
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
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
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
        gif
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
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
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
        gif
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
export const createThoughtLike = /* GraphQL */ `
  mutation CreateThoughtLike(
    $input: CreateThoughtLikeInput!
    $condition: ModelThoughtLikeConditionInput
  ) {
    createThoughtLike(input: $input, condition: $condition) {
      thoughtID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateThoughtLike = /* GraphQL */ `
  mutation UpdateThoughtLike(
    $input: UpdateThoughtLikeInput!
    $condition: ModelThoughtLikeConditionInput
  ) {
    updateThoughtLike(input: $input, condition: $condition) {
      thoughtID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteThoughtLike = /* GraphQL */ `
  mutation DeleteThoughtLike(
    $input: DeleteThoughtLikeInput!
    $condition: ModelThoughtLikeConditionInput
  ) {
    deleteThoughtLike(input: $input, condition: $condition) {
      thoughtID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCommentLike = /* GraphQL */ `
  mutation CreateCommentLike(
    $input: CreateCommentLikeInput!
    $condition: ModelCommentLikeConditionInput
  ) {
    createCommentLike(input: $input, condition: $condition) {
      commentID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCommentLike = /* GraphQL */ `
  mutation UpdateCommentLike(
    $input: UpdateCommentLikeInput!
    $condition: ModelCommentLikeConditionInput
  ) {
    updateCommentLike(input: $input, condition: $condition) {
      commentID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCommentLike = /* GraphQL */ `
  mutation DeleteCommentLike(
    $input: DeleteCommentLikeInput!
    $condition: ModelCommentLikeConditionInput
  ) {
    deleteCommentLike(input: $input, condition: $condition) {
      commentID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReplyLike = /* GraphQL */ `
  mutation CreateReplyLike(
    $input: CreateReplyLikeInput!
    $condition: ModelReplyLikeConditionInput
  ) {
    createReplyLike(input: $input, condition: $condition) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateReplyLike = /* GraphQL */ `
  mutation UpdateReplyLike(
    $input: UpdateReplyLikeInput!
    $condition: ModelReplyLikeConditionInput
  ) {
    updateReplyLike(input: $input, condition: $condition) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteReplyLike = /* GraphQL */ `
  mutation DeleteReplyLike(
    $input: DeleteReplyLikeInput!
    $condition: ModelReplyLikeConditionInput
  ) {
    deleteReplyLike(input: $input, condition: $condition) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
