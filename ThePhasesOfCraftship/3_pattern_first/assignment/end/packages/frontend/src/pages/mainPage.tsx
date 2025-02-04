
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { PostsPresenter } from "../modules/posts/postsPresenter";
import { observe } from "mobx";
import { PostsRepository } from "../modules/posts/postsRepository";
import { createAPIClient } from "@dddforum/shared/src/api";
import { PostViewModel } from "../modules/posts/postViewModel";

export const MainPage = () => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  let apiClient = createAPIClient('http://localhost:3000');
  let postsRepository = new PostsRepository(apiClient);
  let postsPresenter = new PostsPresenter(postsRepository);

  useEffect(() => {
    async function loadPosts() {
      observe(postsPresenter, 'postVMs', (obj) => {
        setPosts(obj.newValue);
      });
      await postsPresenter.load();
    }
    loadPosts();

    // In theory, you'd continue to use this pattern to load more presenters.
    // load<name> + calling the function
  }, []);

  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList
        posts={posts}
      />
    </Layout>
  );
};
