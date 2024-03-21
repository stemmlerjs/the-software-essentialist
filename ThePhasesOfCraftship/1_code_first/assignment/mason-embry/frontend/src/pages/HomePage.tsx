import { useEffect, useState } from 'react';

import { PostsSummaryList } from '../components/PostsSummaryList.tsx';
import { PostsViewSwitcher } from '../components/PostsViewSwitcher.tsx';
import { api, Post } from '../iDontKnowWhereToPutThis/api.ts';
import { convertPostToPostViewModel } from '../iDontKnowWhereToPutThis/convertPostToPostViewModel.ts';

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
