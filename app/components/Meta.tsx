const layoutMeta = {
  name: 'abonglog',
  description:
    '프론트엔드 기술 블로그입니다. 열심히 공부한 내용을 기록하고 공유하여 함께 성장하고 싶습니다.',
  author: 'choiyonghyeun',
  keywords: 'front-end, react,nextjs,html,css',
};

export const LayoutMeta = () => {
  return (
    <>
      <title>abonglog</title>
      <meta name='description' content={layoutMeta.description} />
      <meta name='author' content={layoutMeta.author} />
      <meta name='keywords' content={layoutMeta.keywords} />
      <meta property='og:title' content={layoutMeta.name}></meta>
      <meta property='og:description' content={layoutMeta.description} />
      <meta property='og:image' content='public/asset/profile.jpg' />
      <meta property='og:type' content='article' />
    </>
  );
};
