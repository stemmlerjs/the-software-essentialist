import { Posts } from "@dddforum/api";

export const fakePostsData: Posts.DTOs.PostDTO[] = [
  {
    id: "1", 
    title: "This is my first post",
    content: "First post content",
    postType: "text",
    dateCreated: "2023-01-01T12:00:00Z",
    lastUpdated: "2023-01-01T12:00:00Z",
    member: {
      memberId: "member-1",
      userId: "user-1", 
      username: "testuser1",
      reputationLevel: 'Level1',
      reputationScore: 0
    },
    comments: [],
    voteScore: 4
  },
  {
    id: "2",
    title: "Second post here",
    content: "Second post content",
    postType: "text", 
    dateCreated: "2023-01-02T12:00:00Z",
    lastUpdated: "2023-01-02T12:00:00Z",
    member: {
      memberId: "member-2",
      userId: "user-2",
      username: "testuser2",
      reputationLevel: 'Level1',
      reputationScore: 0
    },
    comments: [],
    voteScore: 2
  },
  {
    id: "3",
    title: "Third post",
    content: "Third post content",
    postType: "text",
    dateCreated: "2023-01-03T12:00:00Z", 
    lastUpdated: "2023-01-03T12:00:00Z",
    member: {
      memberId: "member-3",
      userId: "user-3",
      username: "testuser3",
      reputationLevel: 'Level1',
      reputationScore: 0
    },
    comments: [],
    voteScore: 1
  }
];
