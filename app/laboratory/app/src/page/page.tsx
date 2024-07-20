import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <section className='wrapper'>
      <h1>Hello this is MainPage!</h1>
      <div className='flex'>
        <Link to='/login'>Go to Login Page</Link>
        <Link to='/todo'>Go to Todo Page</Link>
      </div>
    </section>
  );
};

export default MainPage;
