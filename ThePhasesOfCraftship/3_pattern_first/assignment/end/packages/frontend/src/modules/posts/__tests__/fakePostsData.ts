
import { PostDTO } from "@dddforum/shared/src/api/posts";

export const fakePostsData: PostDTO[] = [
  {
    id: '1',
    title: 'This is my first post',
    dateCreated: new Date().toString(),
    member: {
      memberId: '1',
    },
    voteScore: 4,
    postType: 'link',
    comments: []
  },
  {
    id: '5',
    title: '6',
    dateCreated: new Date().toString(),
    member: {
      memberId: '3',
    },
    voteScore: 2,
    postType: 'link',
    comments: []
  },
  {
    id: '5',
    title: '6',
    dateCreated: new Date().toString(),
    member: {
      memberId: '3',
    },
    voteScore: -1,
    postType: 'link',
    comments: []
  }
]
