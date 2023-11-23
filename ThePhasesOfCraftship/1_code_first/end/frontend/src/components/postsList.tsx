
import React from 'react'

import { Link } from "react-router-dom";
import arrow from "../assets/arrow.svg";

type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: string;
  totalNumComments: number;
  voteCount: number;
};

export const PostsList = ({ posts }: { posts: Post[] }) => (
  <div className="posts-list">
    {posts.map((post, key) => (
      <div className="post-item" key={key}>
        <div className="post-item-votes">
          <div className="post-item-upvote">
            <img src={arrow} />
          </div>
          <div>{post.voteCount}</div>
          <div className="post-item-downvote">
            <img src={arrow} />
          </div>
        </div>
        <div className="post-item-content">
          <div className="post-item-title">{post.title}</div>
          <div className="post-item-details">
          <div>{post.dateCreated}</div>
          <Link to={`/member/${post.memberPostedBy}`}>
            by {post.memberPostedBy}
          </Link>
          <div>
            {post.totalNumComments}{" "}
            {post.totalNumComments !== 1 ? `comments` : "comment"}
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
