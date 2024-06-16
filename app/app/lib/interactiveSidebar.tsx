import Link from 'next/link';

import type { PostInfo } from '@/types/post';

type HeadingSize = 1 | 2 | 3;
type HeadingText = string;
type HeadingInfo = [HeadingSize, HeadingText];
export type Headers = HeadingInfo[];

export const parsingHeaders = (content: PostInfo['content']): Headers => {
  const headers: Headers = [];
  const splitedContent = content.split('\r\n');
  splitedContent.forEach((paragraph) => {
    const [headerSize, ...headerText] = paragraph.split(' ');
    switch (headerSize) {
      case '#':
        headers.push([1, headerText.join(' ')]);
        break;
      case '##':
        headers.push([2, headerText.join(' ')]);
        break;
      case '###':
        headers.push([3, headerText.join(' ')]);
        break;
      default:
        break;
    }
  });

  return headers;
};

export const createList = (
  headers: Headers,
  index: number = 0,
  beforeHeadingSize: number = 0,
  list: React.ReactNode[] = [],
) => {
  while (index < headers.length) {
    const [currentHeadingSize, text] = headers[index];
    if (currentHeadingSize > beforeHeadingSize) {
      const subList = createList(headers, index, currentHeadingSize);
      list.push(
        <ul key={`ul-${index}`} className='px-4'>
          {subList.list}
        </ul>,
      );
      index = subList.nextIndex;
    } else if (currentHeadingSize < beforeHeadingSize) {
      return { list, nextIndex: index };
    } else {
      list.push(
        <Link href={`#${text}`} key={`Link-${index}`}>
          <li key={`li-${index++}`} className='mb-2'>
            {text}
          </li>
        </Link>,
      );
      index++;
    }
  }

  return { list, nextIndex: index };
};
