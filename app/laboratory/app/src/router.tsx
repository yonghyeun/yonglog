import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/page';

import PostPage from './pages/post/page';
import EditPage from '@/pages/edit/page';
import AddPage from '@/pages/add/page';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/post', element: <PostPage /> },
  { path: '/edit?:postTitle', element: <EditPage /> },
  { path: '/add?:postTitle', element: <AddPage /> },
]);

export default router;
