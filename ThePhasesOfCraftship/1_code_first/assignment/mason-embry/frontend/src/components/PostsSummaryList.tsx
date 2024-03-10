import { Post, PostSummary } from './PostSummary.tsx';

export function PostsSummaryList({ posts }: { posts: Post[] }) {
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
