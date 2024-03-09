export type Vote = {
  id: number;
  postId: number;
  memberId: number;
  voteType: 'Upvote' | 'Downvote';
};
