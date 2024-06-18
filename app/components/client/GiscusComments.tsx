'use client';

import { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef.current || commentRef.current.hasChildNodes()) {
      /* 이미 section 밑에 Giscus 로 생성한 댓글창이 존재한다면 return*/
      return;
    }

    const $script = document.createElement('script');
    $script.src = 'https://giscus.app/client.js';
    $script.async = true;
    $script.crossOrigin = 'anonymous';

    $script.setAttribute('data-repo', 'yonghyeun/yonglog');
    $script.setAttribute(
      'data-category',
      'Comments',
    ); /* 생성해둔 discussion 카테고리 */
    $script.setAttribute('data-repo-id', 'R_kgDOMBOWo');
    $script.setAttribute('data-category-id', 'DIC_kwDOMBOWoM4CgKX3');
    $script.setAttribute(
      'data-mapping',
      'pathname',
    ); /* 디스커션 제목이 페이지 URL 포함 */
    $script.setAttribute('data-strict', '0');
    $script.setAttribute('data-reactions-enabled', '1');
    $script.setAttribute('data-emit-metadata', '0');
    $script.setAttribute('data-input-position', 'bottom');
    $script.setAttribute('data-theme', 'dark_dimmed');
    $script.setAttribute('data-lang', 'ko');

    commentRef.current.appendChild($script);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    iframe?.contentWindow?.postMessage('https://giscus.app');
  }, []);

  return (
    <section className='border-t-[2px] pt-[3rem] ' ref={commentRef}></section>
  );
};

export default Comments;
