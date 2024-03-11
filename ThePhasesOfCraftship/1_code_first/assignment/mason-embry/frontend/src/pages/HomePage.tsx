import { PostsSummaryList } from '../components/PostsSummaryList.tsx';
import { Post } from '../components/PostSummary.tsx';
import { PostsViewSwitcher } from '../components/PostsViewSwitcher.tsx';

const posts: Post[] = [
  {
    id: '1',
    title: 'Domain services vs. Application services',
    link: 'https://example.com',
    time: '7 days ago',
    author: 'stemmlerjs',
    authorLink: 'https://example.com',
    numComments: 5,
    voteCount: 9,
  },
  {
    id: '2',
    title: 'Ports and Adapters',
    link: 'https://example.com',
    time: '6 days ago',
    author: 'stemmlerjs',
    authorLink: 'https://example.com',
    numComments: 1,
    voteCount: 3,
  },
  {
    id: '3',
    title: 'An Introduction to Domain-Driven Design - DDD w/ TypeScript',
    link: 'https://example.com',
    time: '7 days ago',
    author: 'stemmlerjs',
    authorLink: 'https://example.com',
    numComments: 0,
    voteCount: 2,
  },
];

const HomePage = () => {
  return (
    <div className={'tw-container tw-mx-auto tw-p-4 tw-max-w-screen-md'}>
      <PostsViewSwitcher />

      <div className={'tw-mt-4'}>
        <PostsSummaryList posts={posts} />
      </div>
    </div>
  );
};

export { HomePage };
