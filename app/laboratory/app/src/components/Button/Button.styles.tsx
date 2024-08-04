import styled, { css } from 'styled-components';

export type ButtonProps = {
  primary: boolean;
  disabled: boolean;
  checked: boolean;
  onClick: boolean;
  lable: string;
};

export const StyledButton = styled.button<ButtonProps>`
  padding: 1rem;
  border : none;
  cursor : pointer:
  background-color : white;
  color : black;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: lightgray;
      cursor: not-allowed;
    `}

  ${({ primary }) =>
    primary &&
    css`
      background-color: tomato;
      color: white;
    `}

  ${({ checked }) =>
    checked &&
    css`
      background-color: light-gray;
      color: green;
    `}
`;
