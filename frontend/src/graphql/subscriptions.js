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
      thoughtLikes {
        nextToken
        __typename
      }
      commentLikes {
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
      deviceToken
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
      thoughtLikes {
        nextToken
        __typename
      }
      commentLikes {
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
      deviceToken
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
      thoughtLikes {
        nextToken
        __typename
      }
      commentLikes {
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
      deviceToken
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
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      content
      photo
      music
      active
      parked
      geohash
      likes
      thoughtLikes {
        nextToken
        __typename
      }
      totalReplies
      poll
      anonymous
      comments {
        nextToken
        __typename
      }
      options {
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
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      content
      photo
      music
      active
      parked
      geohash
      likes
      thoughtLikes {
        nextToken
        __typename
      }
      totalReplies
      poll
      anonymous
      comments {
        nextToken
        __typename
      }
      options {
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
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      content
      photo
      music
      active
      parked
      geohash
      likes
      thoughtLikes {
        nextToken
        __typename
      }
      totalReplies
      poll
      anonymous
      comments {
        nextToken
        __typename
      }
      options {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption($filter: ModelSubscriptionOptionFilterInput) {
    onCreateOption(filter: $filter) {
      id
      content
      votes
      parentThought {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      createdAt
      updatedAt
      thoughtOptionsId
      __typename
    }
  }
`;
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption($filter: ModelSubscriptionOptionFilterInput) {
    onUpdateOption(filter: $filter) {
      id
      content
      votes
      parentThought {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      createdAt
      updatedAt
      thoughtOptionsId
      __typename
    }
  }
`;
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption($filter: ModelSubscriptionOptionFilterInput) {
    onDeleteOption(filter: $filter) {
      id
      content
      votes
      parentThought {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      createdAt
      updatedAt
      thoughtOptionsId
      __typename
    }
  }
`;
export const onCreatePollAnswers = /* GraphQL */ `
  subscription OnCreatePollAnswers(
    $filter: ModelSubscriptionPollAnswersFilterInput
  ) {
    onCreatePollAnswers(filter: $filter) {
      thoughtID
      userID
      optionID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePollAnswers = /* GraphQL */ `
  subscription OnUpdatePollAnswers(
    $filter: ModelSubscriptionPollAnswersFilterInput
  ) {
    onUpdatePollAnswers(filter: $filter) {
      thoughtID
      userID
      optionID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePollAnswers = /* GraphQL */ `
  subscription OnDeletePollAnswers(
    $filter: ModelSubscriptionPollAnswersFilterInput
  ) {
    onDeletePollAnswers(filter: $filter) {
      thoughtID
      userID
      optionID
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
        deviceToken
        createdAt
        updatedAt
        __typename
      }
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      content
      likes
      commentLikes {
        nextToken
        __typename
      }
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
        deviceToken
        createdAt
        updatedAt
        __typename
      }
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      content
      likes
      commentLikes {
        nextToken
        __typename
      }
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
        deviceToken
        createdAt
        updatedAt
        __typename
      }
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      content
      likes
      commentLikes {
        nextToken
        __typename
      }
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
        deviceToken
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
        deviceToken
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
        deviceToken
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
export const onCreateThoughtLike = /* GraphQL */ `
  subscription OnCreateThoughtLike(
    $filter: ModelSubscriptionThoughtLikeFilterInput
  ) {
    onCreateThoughtLike(filter: $filter) {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userThoughtLikesId
      thoughtThoughtLikesId
      __typename
    }
  }
`;
export const onUpdateThoughtLike = /* GraphQL */ `
  subscription OnUpdateThoughtLike(
    $filter: ModelSubscriptionThoughtLikeFilterInput
  ) {
    onUpdateThoughtLike(filter: $filter) {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userThoughtLikesId
      thoughtThoughtLikesId
      __typename
    }
  }
`;
export const onDeleteThoughtLike = /* GraphQL */ `
  subscription OnDeleteThoughtLike(
    $filter: ModelSubscriptionThoughtLikeFilterInput
  ) {
    onDeleteThoughtLike(filter: $filter) {
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
        anonymous
        createdAt
        updatedAt
        userThoughtsId
        __typename
      }
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userThoughtLikesId
      thoughtThoughtLikesId
      __typename
    }
  }
`;
export const onCreateCommentLike = /* GraphQL */ `
  subscription OnCreateCommentLike(
    $filter: ModelSubscriptionCommentLikeFilterInput
  ) {
    onCreateCommentLike(filter: $filter) {
      commentID
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
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userCommentLikesId
      commentCommentLikesId
      __typename
    }
  }
`;
export const onUpdateCommentLike = /* GraphQL */ `
  subscription OnUpdateCommentLike(
    $filter: ModelSubscriptionCommentLikeFilterInput
  ) {
    onUpdateCommentLike(filter: $filter) {
      commentID
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
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userCommentLikesId
      commentCommentLikesId
      __typename
    }
  }
`;
export const onDeleteCommentLike = /* GraphQL */ `
  subscription OnDeleteCommentLike(
    $filter: ModelSubscriptionCommentLikeFilterInput
  ) {
    onDeleteCommentLike(filter: $filter) {
      commentID
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
      userID
      user {
        id
        photo
        name
        displayName
        about
        totalThoughts
        darkmode
        reactions
        deviceToken
        createdAt
        updatedAt
        __typename
      }
      originalAuthorID
      createdAt
      updatedAt
      userCommentLikesId
      commentCommentLikesId
      __typename
    }
  }
`;
export const onCreateReplyLike = /* GraphQL */ `
  subscription OnCreateReplyLike(
    $filter: ModelSubscriptionReplyLikeFilterInput
  ) {
    onCreateReplyLike(filter: $filter) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateReplyLike = /* GraphQL */ `
  subscription OnUpdateReplyLike(
    $filter: ModelSubscriptionReplyLikeFilterInput
  ) {
    onUpdateReplyLike(filter: $filter) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteReplyLike = /* GraphQL */ `
  subscription OnDeleteReplyLike(
    $filter: ModelSubscriptionReplyLikeFilterInput
  ) {
    onDeleteReplyLike(filter: $filter) {
      replyID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
