import { useEffect, useState } from 'react';

import { PostsSummaryList } from '../components/PostsSummaryList.tsx';
import { PostViewModel } from '../components/PostSummary.tsx';
import { PostsViewSwitcher } from '../components/PostsViewSwitcher.tsx';
import { api, Post } from '../iDontKnowWhereToPutThis/api.ts';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await api.getPosts();
      setPosts(posts ?? []);
    };

    void fetchPosts();
  }, []);

  return (
    <div className={'tw-container tw-mx-auto tw-p-4 tw-max-w-screen-md'}>
      <PostsViewSwitcher />

      <div className={'tw-mt-4'}>
        <PostsSummaryList posts={posts.map(convertPostToPostViewModel)} />
      </div>
    </div>
  );
};

export { HomePage };

// PRIVATE FUNCTIONS

const convertPostToPostViewModel = (post: Post): PostViewModel => {
  return {
    author: `${post.memberPostedBy.user.firstName} ${post.memberPostedBy.user.lastName}`,
    authorLink: `/members/${post.memberPostedBy.id}`,
    id: post.id.toString(),
    link: `/posts/${post.id}`,
    numComments: post.comments.length,
    time: post.dateCreated,
    title: post.title,
    voteCount: post.votes.length,
  };
};
