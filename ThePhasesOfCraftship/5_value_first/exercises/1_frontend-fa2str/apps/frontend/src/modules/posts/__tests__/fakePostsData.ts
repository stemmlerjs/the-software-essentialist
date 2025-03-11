import * as Posts from "@dddforum/api/posts";

export const fakePostsData: Posts.DTOs.PostDTO[] = [
  {
    id: "1",
    title: "First Post",
    content: "This is the first post",
    postType: "text",
    dateCreated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    member: {
      memberId: "member-1",
      userId: "user-1",
      username: "testuser",
      reputationLevel: "newbie",
      reputationScore: 0
    },
    comments: [],
    voteScore: 0
  }
];
