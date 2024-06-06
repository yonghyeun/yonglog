import path from 'path';

import Image from 'next/image';
import { MDXComponents } from 'mdx/types';

export const useMDXComponents = (
  components: MDXComponents = {},
  imagePath: string,
): MDXComponents => {
  return {
    h1: ({ children }) => (
      <>
        <h1 className=' text-4xl border-b-[2px]  py-8 mb-4 border-gray-300 font-semibold'>
          {children}
        </h1>
      </>
    ),
    h2: ({ children }) => (
      <h2 className='  text-3xl border-b-[1px]  py-8 mb-4 border-gray-300 font-semibold leading-7'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='  text-xl border-b-[1px] py-4 mb-2 border-gray-300 font-semibold leading-7'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-xl py-2 mb-2 border-gray-300 font-semibold leading-7'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className='text-wrap border-l-4 border-gray-300 pl-4 pr-2 mt-2 mb-2 py-2 bg-indigo-200 italic text-gray-600 leading-7 '>
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className='py-1 text-[18px] indent-[1px]'>{children}</p>
    ),

    strong: ({ children }) => (
      <strong className='font-bold text-indigo-700'>{children}</strong>
    ),
    // TODO 코드 포맷터 라이브러리로 추가하기
    code: ({ children, className, ...props }) => {
      return (
        <code className={'font-ibm-plex-mono '} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className='bg-indigo-200 font-jetbrains px-12 py-8 my-8 text-wrap text-[14px]   '>
        {children}
      </pre>
    ),
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
      const imageSrc = path.join(imagePath, src).replace(/\\/g, '/');

      return (
        <span className='flex justify-center w-full mt-8 mb-8'>
          <Image
            src={imageSrc}
            alt={alt || 'image'}
            width={width}
            height={height}
            style={{
              maxWidth: '100%',
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
