import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

export function VoteCount({ voteCount }: { voteCount: number }) {
  return (
    <div className={'tw-flex tw-flex-col tw-items-center tw-text-sm'}>
      <button>
        <FaArrowUp />
      </button>

      <span>{voteCount}</span>

      <button>
        <FaArrowDown />
      </button>
    </div>
  );
}
