import { ActiveContext, ActiveProvider } from '@/app/context/ActiveContext';

import { parsingHeaders, createList } from '@/app/lib/interactiveSidebar';

import type { PostInfo } from '@/types/post';

const PostSideBar = ({ content }: { content: PostInfo['content'] }) => {
  const headers = parsingHeaders(content);
  const { list: PostHeaderList } = createList(headers);
  return (
    <nav className='sticky top-[10rem] w-max-[300px] border-l-[2px] '>
      <ActiveProvider>{PostHeaderList}</ActiveProvider>
    </nav>
  );
};

export default PostSideBar;
