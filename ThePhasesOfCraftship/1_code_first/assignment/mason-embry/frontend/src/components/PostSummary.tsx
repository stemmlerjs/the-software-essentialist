import { Link } from 'react-router-dom';

import { VoteCount } from './VoteCount.tsx';

export interface Post {
  id: string;
  title: string;
  link: string;
  time: string;
  author: string;
  authorLink: string;
  numComments: number;
  voteCount: number;
}

export function PostSummary({ post }: { post: Post }) {
  return (
    <div className={'tw-flex tw-items-center tw-gap-6'}>
      <VoteCount voteCount={post.voteCount} />

      <div>
        <div className={'tw-flex tw-gap-3 tw-items-center'}>
          <h2 className={'tw-text-lg tw-font-medium'}>
            &ldquo;{post.title}&rdquo;
          </h2>

          <Link to={post.link}>[link]</Link>
        </div>

        <div className={'tw-flex tw-gap-2 tw-items-center tw-text-sm'}>
          <span>{post.time}</span>

          <div className={'tw-border-black tw-border-l tw-h-4'}></div>

          <span>
            by{' '}
            <Link
              to={post.authorLink}
              className={
                'tw-underline tw-text-blue-600 hover:tw-text-blue-800 visited:tw-text-purple-600'
              }
            >
              {post.author}
            </Link>
          </span>

          <div className={'tw-border-black tw-border-l tw-h-4'}></div>

          <span>{post.numComments} comments</span>
        </div>
      </div>
    </div>
  );
}
