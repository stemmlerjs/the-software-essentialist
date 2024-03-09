import moment from 'moment';
import { Link } from 'react-router-dom';
import { Post } from '../types/Post';
import arrowUp from '../icons/up-arrow.png';
import arrowDown from '../icons/down-arrow.png';

function computeVoteCount(votes: Post['votes']) {
  let result = 0;
  votes.forEach((v) => {
    v.voteType === 'Upvote' ? result++ : result--;
  });
  return result;
}

const Post = ({ post }: { post: Post }) => (
  <div className='flex py-3'>
    <PostVotes post={post} />
    <PostContent post={post} />
  </div>
);

const PostVotes = ({ post }: { post: Post }) => (
  <div className='flex flex-col items-center justify-center mr-6'>
    <div className='max-w-5'>
      <img src={arrowUp} />
    </div>
    <div className='py-1.5 text-lg font-semibold text-gray-800'>
      {computeVoteCount(post.votes)}
    </div>
    <div className='max-w-5'>
      <img src={arrowDown} />
    </div>
  </div>
);

const PostContent = ({ post }: { post: Post }) => (
  <div className='w-full self-center'>
    <div className='text-xl font-semibold'>"{post.title}"</div>
    <div className='flex space-x-2'>
      <div>{moment(post.dateCreated).fromNow()}</div>

      <span>|</span>

      <div>
        <span>by </span>
        <Link
          to={`/member/${post.memberPostedBy.user.username}`}
          className='underline text-purple-600'
        >
          {post.memberPostedBy.user.username}
        </Link>
      </div>

      <span>|</span>

      <div>
        {post.comments.length}{' '}
        {post.comments.length !== 1 ? 'comments' : 'comment'}
      </div>
    </div>
  </div>
);

export const PostsList = ({ posts }: { posts: Post[] }) => (
  <div className='flex flex-col pt-4 justify-center'>
    {posts.map((post, key) => (
      <Post post={post} key={key} />
    ))}
  </div>
);
