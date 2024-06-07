
import { useState } from 'react';

export const PostsViewSwitcher = () => {
  const [postView, setPostsView] = useState("popular");

  const onPostViewSelected = (newView: string) => {
    setPostsView(newView);
  };

  return (
    <div className="posts-view-switcher flex">
      <div
        onClick={() => onPostViewSelected("popular")}
        className={`${postView === "popular" ? "active" : ""}`}
      >
        Popular
      </div>
      <div
        onClick={() => onPostViewSelected("new")}
        className={`${postView === "new" ? "active" : ""}`}
      >
        New
      </div>
    </div>
  );
};