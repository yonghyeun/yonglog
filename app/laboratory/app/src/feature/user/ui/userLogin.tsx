import { users } from '@/mocupdata';

import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { changeUser } from '@/feature/user/userSlice';

const HeaderWithLogin = () => {
  const { userName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeUser(event.target.value));
  };

  return (
    <section>
      {userName !== 'logout' && <h1>Hello ~ {userName}</h1>}
      <div className='header'>
        <Link to={`add/${userName}`}>Add Post</Link>
        <div className='flex'>
          <p>login:</p>
          <select
            name='login'
            id='login'
            value={userName}
            onChange={handleLogin}
          >
            <option value='logout'>logout</option>
            {users.map(({ userName }, idx) => (
              <option key={idx} value={userName}>
                {userName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default HeaderWithLogin;
