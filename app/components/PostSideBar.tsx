import { ActiveProvider } from '@/app/context/ActiveContext';
import { Up, Down } from '@/components/Arrow';

import { parsingHeaders, createList } from '@/app/lib/interactiveSidebar';

import type { PostInfo } from '@/types/post';

const PostSideBar = ({ content }: { content: PostInfo['content'] }) => {
  const headers = parsingHeaders(content);
  const { list: PostHeaderList } = createList(headers);
  return (
    <nav className='sticky top-[10rem] w-[300px] border-l-[2px] post-side-bar'>
      <ActiveProvider>{PostHeaderList}</ActiveProvider>
      <ul className='flex'>
        <li className='pl-2'>
          <Up />
        </li>
        <li>
          <Down />
        </li>
      </ul>
    </nav>
  );
};

export default PostSideBar;
