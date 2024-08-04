import { StyledButton, ButtonProps } from './Button.styles';

const Button = (props: ButtonProps) => {
  return <StyledButton {...props}>{props.lable}</StyledButton>;
};

export default Button;
