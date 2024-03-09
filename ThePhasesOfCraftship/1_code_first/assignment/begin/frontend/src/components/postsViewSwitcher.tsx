type Props = {
  view: 'popular' | 'new';
  setView: React.Dispatch<React.SetStateAction<'popular' | 'new'>>;
};

export const PostsViewSwitcher = ({ view, setView }: Props) => {
  return (
    <div className='flex'>
      <button
        onClick={() => setView('popular')}
        className={`border-r-2 border-black text-2xl pr-3 ${
          view === 'popular' ? 'font-semibold' : ''
        }`}
      >
        Popular
      </button>
      <button
        onClick={() => setView('new')}
        className={`text-2xl pr-3 pl-3 ${
          view === 'new' ? 'font-semibold' : 'opacity-30'
        }`}
      >
        New
      </button>
    </div>
  );
};
