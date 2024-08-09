import { StyledButton, ButtonProps } from './Button.styles';
import { create } from 'zustand';
const Button = (props: ButtonProps) => {
  return <StyledButton {...props}>{props.lable}</StyledButton>;
};

export default Button;
