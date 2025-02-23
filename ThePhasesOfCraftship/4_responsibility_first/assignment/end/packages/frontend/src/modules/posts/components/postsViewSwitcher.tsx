
import { PostsFilterValue } from "../application/searchFilterViewModel";

export const PostsViewSwitcher = ({
  postsView,
  onPostViewSelected,
}: {
  postsView: PostsFilterValue;
  onPostViewSelected: (newValue: PostsFilterValue) => void;
}) => {
  return (
    <div className="posts-view-switcher flex">
      <div
        onClick={() => onPostViewSelected("popular")}
        className={`${postsView === "popular" ? "active" : ""}`}
      >
        Popular
      </div>
      <div
        onClick={() => onPostViewSelected("recent")}
        className={`${postsView === "recent" ? "active" : ""}`}
      >
        New
      </div>
    </div>
  );
};
