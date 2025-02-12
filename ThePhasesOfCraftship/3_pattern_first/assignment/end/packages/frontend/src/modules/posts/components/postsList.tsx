
import { Link } from "react-router-dom";
import arrow from "../../../shared/assets/arrow.svg";
import moment from 'moment';
import { PostViewModel } from "../application/postViewModel";

export const PostsList = ({ posts }: { posts: PostViewModel[] }) => (
  <div className="posts-list">
    {posts.map((post, key) => (
      <div className="post-item" key={key}>
        <div className="post-item-votes">
          <div className="post-item-upvote">
            <img src={arrow} />
          </div>
          <div>{post.voteScore}</div>
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
            {post.numComments}{" "}
            {post.numComments !== 1 ? `comments` : "comment"}
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
