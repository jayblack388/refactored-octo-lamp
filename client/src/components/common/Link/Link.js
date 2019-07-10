import React from 'react';
import { StyledBtnLink, StyledLink } from './Link.styled';
import { ButtonText } from '../Button/Button.styled';

export const ButtonLink = props => {
  const { message, children } = props;
  return (
    <StyledBtnLink {...props}>
      <ButtonText bold={true}>{message || children}</ButtonText>
    </StyledBtnLink>
  );
};

export const Link = props => {
  const { message, children } = props;
  return (
    <StyledLink {...props}>
      <ButtonText>{message || children}</ButtonText>
    </StyledLink>
  );
};
