type Todo = {
  id: number;
  content: string;
};

const ENDPOINT = 'http://localhost:3000/api/dev/todo';
const fetchTodo = async (): Promise<Todo[]> => {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error('Fail to fetch');
  }
  const data: Todo[] = await response.json();
  return data;
};

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Todo = () => {
  const [dummy, setDummy] = useState<number>(0);
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todo', dummy],
    queryFn: fetchTodo,
  });

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>Error is occured</div>;
  return (
    <div className='wrapper'>
      <p>dummy : {dummy}</p>
      <ul>
        {todos.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setDummy((prev) => ++prev);
        }}
      >
        re-render!
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className='flex'>
      <Todo />
      <Todo />
    </div>
  );
};

export default App;
