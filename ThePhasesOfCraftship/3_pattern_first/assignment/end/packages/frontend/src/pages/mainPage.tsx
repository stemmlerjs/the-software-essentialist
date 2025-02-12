
import { useEffect, useState } from "react";
import { observe } from "mobx";
import { PostViewModel } from "../modules/posts/application/postViewModel";
import { PostsViewSwitcher } from "../modules/posts/components/postsViewSwitcher";
import { PostsList } from "../modules/posts/components/postsList";
import { Layout } from "../shared/components/layout";
import { postsPresenter } from "../main";

export const MainPage = () => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);

  useEffect(() => {
    async function loadPosts() {
      observe(postsPresenter, 'postVMs', (obj) => {
        console.log('new', obj.newValue);
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
