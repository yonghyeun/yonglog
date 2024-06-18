'use client';

import { useState } from 'react';

import Link from 'next/link';

import type { PostInfo } from '@/types/post';

const AccordionsWithState = ({
  seriesTitle,
  items,
  currentPostId,
}: {
  seriesTitle: string;
  items: PostInfo[];
  currentPostId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className='rounded-xl bg-indigo-950 text-slate-50 px-4 py-4 mb-12 '>
      <p className='text-2xl'>
        이 글은 <b className='font-semibold'>{seriesTitle}</b>의 게시글이예요
      </p>
      <section className={`${isOpen ? 'block' : 'hidden'} `}>
        <ul className='px-4 py-4'>
          {items.map(({ meta }, id) => {
            const { postId, title } = meta;
            const isActive = currentPostId === postId;
            return (
              <ol key={id} data-active={isActive}>
                {id + 1} . <Link href={String(postId)}>{title}</Link>
              </ol>
            );
          })}
        </ul>
      </section>
      <button onClick={handleOpen} className='mr-2 mt-2'>
        시리즈 게시글 목록 {isOpen ? '▲' : '▼'}
      </button>
    </section>
  );
};

export default AccordionsWithState;
