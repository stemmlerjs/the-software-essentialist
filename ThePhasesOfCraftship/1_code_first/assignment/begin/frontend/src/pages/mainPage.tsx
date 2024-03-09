import { useState } from 'react';
import { Layout } from '../components/layout';
import { PostsList } from '../components/postsList';
import { PostsViewSwitcher } from '../components/postsViewSwitcher';
import { api } from '../api';
import { useQuery } from '../hooks/useQuery';

export const MainPage = () => {
  const { data, error, loading } = useQuery(async () => {
    const response = await api.posts.getPosts();

    if (!response.success) throw new Error();

    return response.data.posts;
  });

  const [postsView, setPostsView] = useState<'popular' | 'new'>('popular');

  if (loading) return 'loading...';
  if (error) return 'error...';
  if (!data) return 'no data...';

  return (
    <Layout>
      <PostsViewSwitcher view={postsView} setView={setPostsView} />
      <PostsList posts={data} />
    </Layout>
  );
};
