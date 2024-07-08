import HeaderWithLogin from '@/feature/user/ui/userLogin';
import AllPosts from '@/feature/posts/ui/AllPosts';

const MainPage = () => {
  return (
    <section className='main-page'>
      <h1>Main Page</h1>
      <HeaderWithLogin />
      <AllPosts />
    </section>
  );
};

export default MainPage;
