import { parsingHeaders, createList } from '@/app/lib/interactiveSidebar';

import type { PostInfo } from '@/types/post';

const PostSideBar = ({ content }: { content: PostInfo['content'] }) => {
  const headers = parsingHeaders(content);
  const { list: PostHeaderList } = createList(headers);
  return (
    <nav className='sticky top-[15rem] w-max-[300px] border-l-[2px] '>
      {PostHeaderList}
    </nav>
  );
};

export default PostSideBar;