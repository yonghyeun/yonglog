import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../../feature/login/Login'));

const LoginPage = () => {
  return (
    <Suspense fallback={<div>loading..</div>}>
      <h1>Hello this is Login Page !</h1>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
