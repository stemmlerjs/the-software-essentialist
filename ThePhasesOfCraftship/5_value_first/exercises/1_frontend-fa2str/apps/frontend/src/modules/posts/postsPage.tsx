
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { observe } from "mobx";
import { PostViewModel } from "./application/postViewModel";
import { PostsViewSwitcher } from "./components/postsViewSwitcher";
import { PostsList } from "./components/postsList";
import { PostsFilterValue } from "./application/searchFilterViewModel";
import { usePresenters } from "../../shared/presenters/presentersContext";
import { Layout } from "@/shared/layout/layoutComponent";

export const PostsPage = observer(() => {
  const { posts: presenter } = usePresenters()
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [postView, setPostsView] = useState<PostsFilterValue>('popular');


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
