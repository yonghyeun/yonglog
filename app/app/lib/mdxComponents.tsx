import path from 'path';
import Image from 'next/image';

import { MDXComponents } from 'mdx/types';

/**
 * @param {MDXComponents}   [components = []] - 서드파티 라이브러리 등에서 제공하는 컴포넌트를 인수로 받을 수 있음
 * @param {string} [postPath] - post 들이 존재하는 Directory 의 경로이다. 파싱되는 img 태그의 주소를 생성 할 떄 사용된다.
 */
export const useMDXComponents = (
  components: MDXComponents = {},
  postPath?: string,
): MDXComponents => {
  return {
    h1: ({ children }) => {
      return (
        <>
          <h1
            className='text-3xl border-b-[2px]   pt-8 pb-2 mb-2 border-gray-300 font-semibold  bg-inherit'
            id={children as string}
          >
            {children}
          </h1>
        </>
      );
    },
    h2: ({ children }) => (
      <h2
        className='   text-2xl border-b-[1px]   pt-8 pb-2 mb-2 border-gray-300 font-semibold leading-7 '
        id={children as string}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className='   text-xl border-b-[1px]  pt-8 pb-2 mb-2 border-gray-300 font-semibold leading-7 '
        id={children as string}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-l border-b-[1px]  py-2 mb-2 border-gray-300 font-semibold leading-7'>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        theme-block='true'
        className='text-wrap border-l-4  pl-4 pr-2 mt-2 mb-2 py-2 italic  leading-7 '
      >
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className='indent-2 whitespace-pre-wrap break-all mb-[1rem]  leading-slug text-[18px] '>
        {children}
      </p>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    img: ({
      src,
      alt,
      width = 800,
      height = 600,
      ...props
    }: {
      src: string;
      alt?: string;
      width?: number;
      height?: number;
    }) => {
      const imageSrc = postPath
        ? path.join(postPath, src).replace(/\\/g, '/')
        : '';

      return (
        <span className='grid justify-center items-center  mx-auto w-full my-8'>
          <Image
            src={imageSrc}
            alt={alt || 'image'}
            width={800}
            height={600}
            sizes='
            (max-width: 640px) 100vw,      
            (max-width: 768px) 100vw,      
            (max-width: 1024px) 100vw,     
            (max-width: 1280px) 800px,     
            800px                          
          '
            style={{
              width: 'auto',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
            {...props}
          />
          {alt && alt !== 'alt text' && (
            <span
              className={`italic block text-center text-[90%] width-${width}px`}
            >
              {alt}
            </span>
          )}
        </span>
      );
    },
    a: ({ href, children }) => (
      <a href={href} className='text-blue-500'>
        🪢 {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className='list-disc pl-8 my-2 text-[18px] '>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className='list-decimal pl-8 my-2 text-[18px] '>{children}</ol>
    ),
    li: ({ children }) => <li className='break-all ml-2 mb-2'>{children}</li>,
    ...components,
  };
};
