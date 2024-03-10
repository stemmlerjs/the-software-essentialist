import { PostsList } from '../components/PostsList.tsx';
import { PostsViewSwitcher } from '../components/PostsViewSwitcher.tsx';

const HomePage = () => {
  return (
    <div className={'tw-container tw-mx-auto tw-p-4 tw-pt-8'}>
      <PostsViewSwitcher />

      <div className={'tw-mt-4'}>
        <PostsList />
      </div>
    </div>
  );
};

export { HomePage };
