import { LoadingTitle, LoadingContnet } from '@/components/Loading';

const PostLoading = () => (
  <>
    <header className='pt-14 mb-12'>
      <LoadingTitle />
    </header>
    <main className='px-14'>
      <LoadingContnet />
    </main>
  </>
);

export default PostLoading;
