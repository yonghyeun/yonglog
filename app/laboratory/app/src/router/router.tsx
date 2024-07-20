import LoginPage from '../page/login/page';
import MainPage from '../page/page';
import TodoPage from '../page/todo/page';
import { createBrowserRouter } from 'react-router-dom';

export const routerConfig = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'todo',
    element: <TodoPage />,
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
