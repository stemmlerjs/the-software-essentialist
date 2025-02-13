
import { useEffect, useState } from "react";
import { observe } from "mobx";
import { PostViewModel } from "../modules/posts/application/postViewModel";
import { PostsViewSwitcher } from "../modules/posts/components/postsViewSwitcher";
import { PostsList } from "../modules/posts/components/postsList";
import { Layout } from "../shared/components/layout";
import { postsPresenter } from "../main";
import { PostsFilterValue } from "../modules/posts/application/searchFilterViewModel";

export const MainPage = () => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [postView, setPostsView] = useState<PostsFilterValue>('popular');

  useEffect(() => {
    async function loadPosts() {
      observe(postsPresenter, 'postVMs', (obj) => {
        setPosts(obj.newValue);
      });

      observe(postsPresenter, 'searchFilter', (obj) => {
        setPostsView(obj.newValue.value);
      });
      await postsPresenter.load();
    }
    loadPosts();
  }, []);

  return (
    <Layout>
      <PostsViewSwitcher 
        postsView={postView}
        onPostViewSelected={(newValue) => postsPresenter.switchSearchFilter(newValue)}
      />
      <PostsList
        posts={posts}
      />
    </Layout>
  );
};
