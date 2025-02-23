
import { PostDTO } from "@dddforum/shared/src/api/posts";
import { DateUtil } from '@dddforum/shared/src/utils/dateUtil'

export const fakePostsData: PostDTO[] = [
  {
    id: '1',
    title: 'This is my first post',
    dateCreated: DateUtil.createFromRelativeDaysAgo(4),
    member: {
      memberId: '1',
      username: 'khalilstemmler'
    },
    voteScore: 4,
    postType: 'link',
    comments: []
  },
  {
    id: '2',
    title: 'This is the second post',
    dateCreated: DateUtil.createFromRelativeDaysAgo(3),
    member: {
      memberId: '3',
      username: 'billybob'
    },
    voteScore: 2,
    postType: 'link',
    comments: []
  },
  {
    id: '3',
    title: 'This is the third post',
    dateCreated: DateUtil.createFromRelativeDaysAgo(1),
    member: {
      memberId: '3',
      username: 'samson'
    },
    voteScore: -1,
    postType: 'link',
    comments: []
  }
]
