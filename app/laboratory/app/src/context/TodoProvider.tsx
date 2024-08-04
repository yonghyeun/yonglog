import { useCallback, useState } from 'react';
import { TodoContext } from './TodoContext';
import type { TodoBody } from './TodoContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoBody['todos']>([]);
  const _setTodos = useCallback(setTodos, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos: _setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default Provider;
