import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PostViewModel } from '../components/PostSummary.tsx';
import { Post } from './api.ts';

dayjs.extend(relativeTime);

export const convertPostToPostViewModel = (post: Post): PostViewModel => {
  return {
    author: `${post.memberPostedBy.user.firstName} ${post.memberPostedBy.user.lastName}`,
    authorLink: `/members/${post.memberPostedBy.id}`,
    id: post.id.toString(),
    link: `/posts/${post.id}`,
    numComments: post.comments.length,
    time: dayjs(post.dateCreated).fromNow(),
    title: post.title,
    voteCount: post.votes.length,
  };
};
