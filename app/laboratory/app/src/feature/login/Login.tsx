import { useState } from 'react';
import useAuth from './api';

const Login = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const mutation = useAuth();

  const typeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const typePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isDisabled = !id || !password;

  return (
    <section className='wrapper'>
      <div className='flex'>
        <label htmlFor='id'>ID : </label>
        <input type='text' id='id' data-testid='id' onChange={typeId} />
      </div>
      <div className='flex'>
        <label htmlFor='password'>Password : </label>
        <input
          type='text'
          id='password'
          data-testid='password'
          onChange={typePassword}
        />
      </div>
      <button
        data-testid='submit'
        disabled={isDisabled}
        onClick={() => {
          mutation.mutate({ id, password });
        }}
      >
        Login!
      </button>
    </section>
  );
};

export default Login;
