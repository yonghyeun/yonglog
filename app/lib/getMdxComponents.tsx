import path from "path";
import Image from "next/image";

import { MDXComponents } from "mdx/types";

/**
 * @param {MDXComponents}   [components = []] - 서드파티 라이브러리 등에서 제공하는 컴포넌트를 인수로 받을 수 있음
 * @param {string} [postPath] - post 들이 존재하는 Directory 의 경로이다. 파싱되는 img 태그의 주소를 생성 할 떄 사용된다.
 */
export const getMdxComponents = (
  components: MDXComponents = {},
  postPath?: string
): MDXComponents => {
  return {
    h1: ({ children }) => {
      return (
        <>
          <h1
            className="text-4xl border-b-[2px] my-8 py-4  border-gray-300  bg-inherit"
            id={children as string}
          >
            {children}
          </h1>
        </>
      );
    },
    h2: ({ children }) => (
      <h2
        className="   text-3xl border-b-[1px]  my-8 py-4  border-gray-300 leading-7 "
        id={children as string}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="   text-2xl border-b-[1px] my-8 py-4  border-gray-300  leading-7 "
        id={children as string}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl border-b-[1px]  my-8 py-4 border-gray-300 font-semibold leading-7">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        theme-block="true"
        className="text-wrap   px-4 pr-2 mt-2 rounded-xl mb-2 py-2 italic  leading-7 "
      >
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className="whitespace-pre-wrap break-all mb-2  leading-slug ">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-normal">{children}</strong>
    ),
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
        ? path.join(postPath, src).replace(/\\/g, "/")
        : "";

      return (
        <span className="grid justify-center items-center  mx-auto w-full my-8">
          <Image
            src={imageSrc}
            alt={alt || "image"}
            width={800}
            height={600}
            style={{
              width: "auto",
              height: "auto",
              borderRadius: "8px",
              display: "block",
            }}
            {...props}
          />
          {alt && alt !== "alt text" && (
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
      <a href={href} className="text-blue-500">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-8 my-2 text-[18px] ">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 my-2 text-[18px] ">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-list break-all mb-2">{children}</li>
    ),
    ...components,
  };
};
