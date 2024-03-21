import { PostSummary, PostViewModel } from './PostSummary.tsx';

export function PostsSummaryList({ posts }: { posts: PostViewModel[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className={'tw-mb-4'}>
          <PostSummary post={post} />
        </li>
      ))}
    </ul>
  );
}
