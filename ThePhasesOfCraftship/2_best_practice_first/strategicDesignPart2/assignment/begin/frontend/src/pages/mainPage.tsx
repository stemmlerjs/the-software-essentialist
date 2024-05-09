
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { api } from "../api";

export const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    try {
      let response = await api.posts.getPosts();

      setPosts(response.data.data.posts)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [])


  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList
        posts={posts}
      />
    </Layout>
  );
};



