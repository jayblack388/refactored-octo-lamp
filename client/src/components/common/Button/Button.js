import React from 'react';
import { Button as StyledButton } from './Button.styled';

const Button = props => {
  const { message, children = <span /> } = props;
  return <StyledButton {...props}>{message || children}</StyledButton>;
};

export default Button;
