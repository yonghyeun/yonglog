import { Suspense, lazy } from 'react';

const TodoList = lazy(() => import('../../feature/todo/Todo'));

const TodoPage = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <h1>Hello this is TodoPage !</h1>
      <TodoList />
    </Suspense>
  );
};

export default TodoPage;
