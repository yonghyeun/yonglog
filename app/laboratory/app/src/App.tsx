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

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Todo = () => {
  const { data: todos, isLoading } = useQuery({
    queryFn: fetchTodo,
    queryKey: ['todo'],
  });

  if (isLoading) return <div>Loading ...</div>;

  return (
    <ul className='wrapper'>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </ul>
  );
};

const postTodo = async (newTodo: Todo) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error('Fail to Post');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error(
      error instanceof Error ? error.message : 'Unexcpected Error is occured',
    );
  }
};

const TodoForm = () => {
  const [text, setText] = useState<string>('');
  const { mutate, isPending } = useMutation({
    mutationKey: ['postTodo'],
    mutationFn: postTodo,
  });

  return (
    <div className='flex'>
      <input
        type='text'
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          mutate({
            id: Math.floor(Math.random() * 1000),
            content: text,
          });
        }}
      >
        {isPending ? 'Loading ...' : 'Post'}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className='wrapper'>
      <Todo />
      <TodoForm />
    </div>
  );
};

export default App;
