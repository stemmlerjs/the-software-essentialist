
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { observe } from "mobx";
import { PostViewModel } from "../modules/posts/application/postViewModel";
import { PostsViewSwitcher } from "../modules/posts/components/postsViewSwitcher";
import { PostsList } from "../modules/posts/components/postsList";
import { Layout } from "../modules/layout/layout";
import { PostsFilterValue } from "../modules/posts/application/searchFilterViewModel";
import { useAuthStore } from "../shared/auth/useAuthStore";
import { PostsPresenter } from "../modules/posts/application/postsPresenter";

export const MainPage = observer(({ presenter }: { presenter: PostsPresenter }) => {
  const { currentUser } = useAuthStore();
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [postView, setPostsView] = useState<PostsFilterValue>('popular');

  console.log(currentUser);
  console.log('here');

  useEffect(() => {
    async function loadPosts() {
      observe(presenter, 'postVMs', (obj) => {
        setPosts(obj.newValue);
      });

      observe(presenter, 'searchFilter', (obj) => {
        setPostsView(obj.newValue.value);
      });
      await presenter.load();
    }
    loadPosts();
  }, []);

  return (
    <Layout>
      <PostsViewSwitcher 
        postsView={postView}
        onPostViewSelected={(newValue) => presenter.switchSearchFilter(newValue)}
      />
      <PostsList
        posts={posts}
      />
    </Layout>
  );
});
