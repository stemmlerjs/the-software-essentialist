export function PostsViewSwitcher() {
  return (
    <div className={'tw-flex tw-items-center tw-gap-4 tw-font-medum'}>
      <button className={'tw-text-lg'}>Popular</button>
      <div className={'tw-border-black tw-border-l tw-h-8'}></div>
      <button className={'tw-text-lg tw-text-gray-400'}>New</button>
    </div>
  );
}
