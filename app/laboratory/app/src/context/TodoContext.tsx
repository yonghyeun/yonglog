import { createContext } from 'react';

export type Todo = {
  id: number;
  todo: string;
  isDone: boolean;
  isImportant: boolean;
};

export type TodoBody = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoContext = createContext<TodoBody | null>(null);
