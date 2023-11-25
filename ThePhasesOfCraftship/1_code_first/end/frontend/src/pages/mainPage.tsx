
import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { api } from "../api";

const createRelativeDateString = (daysAgo: number) => {
  let baseDate = new Date();
  return "2 days ago";
};

export const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    try {
      let response = await api.posts.getPosts();
      setPosts(response.data.posts)
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
