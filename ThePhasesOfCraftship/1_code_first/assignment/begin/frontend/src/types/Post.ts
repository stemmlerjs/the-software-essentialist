import { Comment } from './Comment';
import { User } from './User';
import { Vote } from './Vote';

export type Post = {
  id: number;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  votes: Vote[];
  memberPostedBy: {
    id: number;
    userId: number;
    user: User;
  };
  comments: Comment[];
};
