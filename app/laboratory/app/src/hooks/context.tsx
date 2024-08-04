import { TodoContext } from '@/context/TodoContext';
import { useContext } from 'react';

export const useTodos = () => {
  return useContext(TodoContext);
};
