'use client';

import { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef.current || commentRef.current.hasChildNodes()) {
      // 이미 section 밑에 Giscus 로 생성한 댓글창이 존재한다면 return
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'yonghyeun/yonglog');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-repo-id', 'R_kgDOMBOWoA');
    script.setAttribute('data-category-id', 'DIC_kwDOMBOWoM4CgKYD');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'cobalt');
    script.setAttribute('data-lang', 'ko');
    commentRef.current.appendChild(script);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    iframe?.contentWindow?.postMessage('https://giscus.app');
  }, []);

  return (
    <section
      className='border-t-[2px] pt-[3rem] giscus'
      ref={commentRef}
    ></section>
  );
};

export default Comments;
