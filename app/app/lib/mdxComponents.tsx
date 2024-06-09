import path from 'path';
import Image from 'next/image';

import { MDXComponents } from 'mdx/types';

/**
 * @param {MDXComponents}   [components = []] - 서드파티 라이브러리 등에서 제공하는 컴포넌트를 인수로 받을 수 있음
 * @param {string} [postPath] - post 들이 존재하는 Directory 의 경로이다. 파싱되는 img 태그의 주소를 생성 할 떄 사용된다.
 */
export const useMDXComponents = (
  components: MDXComponents = {},
  postPath: string,
): MDXComponents => {
  return {
    h1: ({ children }) => {
      return (
        <>
          <h1
            className=' sticky top-[3.5rem]  text-4xl border-b-[2px]  pt-4 pb-2 mb-8 border-gray-300 font-semibold  bg-indigo-100'
            id={children as string}
          >
            {children}
          </h1>
        </>
      );
    },
    h2: ({ children }) => (
      <h2
        className='   text-3xl border-b-[1px]   py-8 mb-4 border-gray-300 font-semibold leading-7 '
        id={children as string}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className='   text-xl border-b-[1px]  py-4 mb-2 border-gray-300 font-semibold leading-7 '
        id={children as string}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-xl border-b-[1px]  py-2 mb-2 border-gray-300 font-semibold leading-7'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className='text-wrap border-l-4 border-gray-300 pl-4 pr-2 mt-2 mb-2 py-2 bg-indigo-200 italic text-gray-600 leading-7 '>
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className='py-1 text-[16px] indent-[1px]'>{children}</p>
    ),

    strong: ({ children }) => <strong>{children}</strong>,
    // TODO 코드 포맷터 라이브러리로 추가하기
    img: ({
      src,
      alt,
      width = 600,
      height = 400,
      ...props
    }: {
      src: string;
      alt?: string;
      width?: number;
      height?: number;
    }) => {
      const imageSrc = path.join(postPath, src).replace(/\\/g, '/');

      return (
        <span className='flex justify-center w-full mt-8 mb-8'>
          <Image
            src={imageSrc}
            alt={alt || 'image'}
            width={width}
            height={height}
            style={{
              width: 'auto',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        </span>
      );
    },
    a: ({ href, children }) => (
      <a href={href} className='text-blue-500'>
        🪢 {children}
      </a>
    ),
    ...components,
  };
};
