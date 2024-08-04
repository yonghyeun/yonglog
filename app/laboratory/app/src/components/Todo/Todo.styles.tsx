import styled, { css } from 'styled-components';
import type { Todo } from '@/context/TodoContext';

export type TodoProps = Omit<Todo, 'id'>;

export const StyledTodo = styled.div<TodoProps>`
  padding: 1rem;

  ${({ isImportant }) =>
    isImportant &&
    css`
      color: red;
      font-weight: 700;
      text-decoration: underline;
    `}

  ${({ isDone }) =>
    isDone &&
    css`
      color: gray;
      font-style: italic;
      text-decoration: line-through;
    `}
`;
