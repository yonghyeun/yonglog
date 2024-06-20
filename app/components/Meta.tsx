const layoutMeta = {
  name: 'abonglog',
  description:
    '프론트엔드 기술 블로그입니다. 열심히 공부한 내용을 기록하고 공유하여 함께 성장하고 싶습니다.',
  author: 'choiyonghyeun',
  keywords: 'front-end, react,nextjs,html,css',
  image:
    'https://abonglog.vercel.app/_next/image?url=%2Fasset%2Fprofile.jpg&w=256&q=75',
};

export const LayoutMeta = () => {
  return (
    <>
      <title>abonglog</title>
      {/* 파비콘들에 대한 링크태그들 */}
      <link rel='icon' href='asset/favicon.ico' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='favicons/ms-icon-144x144.png'
      />
      {/* 공통 메타 태그 */}
      <meta name='description' content={layoutMeta.description} />
      <meta name='author' content={layoutMeta.author} />
      <meta name='keywords' content={layoutMeta.keywords} />
      {/* openGraph Meta 태그 */}
      <meta property='og:title' content={layoutMeta.name}></meta>
      <meta property='og:description' content={layoutMeta.description} />
      <meta property='og:image' content={layoutMeta.image} />
      <meta property='og:type' content='article' />
      <meta property='og:url' content='abonglog.me'></meta>
      {/* 트튀어 전용 Meta 태그*/}
      <meta name='twitter:title' content={layoutMeta.name} />
      <meta name='twitter:description' content={layoutMeta.description} />
      <meta name='twitter:image' content={layoutMeta.image} />
    </>
  );
};
