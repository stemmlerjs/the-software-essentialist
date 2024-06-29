
import { Link } from "react-router-dom";
import arrow from "../shared/assets/arrow.svg";
import moment from 'moment';


type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
type Comment = {
  content: string
};

type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: any;
  comments: Comment[];
  votes: Vote[]
};

function computeVoteCount(votes: Vote[]) {
  let count = 0;
  votes.forEach((v) => v.voteType === 'Upvote' ? count++ : count--);
  return count;
}

export const PostsList = ({ posts }: { posts: Post[] }) => (
  <div className="posts-list">
    {posts.map((post, key) => (
      <div className="post-item" key={key}>
        <div className="post-item-votes">
          <div className="post-item-upvote">
            <img src={arrow} />
          </div>
          <div>{computeVoteCount(post.votes)}</div>
          <div className="post-item-downvote">
            <img src={arrow} />
          </div>
        </div>
        <div className="post-item-content">
          <div className="post-item-title">{post.title}</div>
          <div className="post-item-details">
          <div>{moment(post.dateCreated).fromNow()}</div>
          <Link to={`/member/${post.memberPostedBy.user.username}`}>
            by {post.memberPostedBy.user.username}
          </Link>
          <div>
            {post.comments.length}{" "}
            {post.comments.length !== 1 ? `comments` : "comment"}
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
