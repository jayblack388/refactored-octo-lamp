import React from 'react';
import {
  StyledExternalBtnLink,
  StyledExternalLink,
} from './ExternalLink.styled';
import { ButtonText } from '../Button/Button.styled';

export const ExternalBtnLink = props => {
  const { message, children } = props;
  return (
    <StyledExternalBtnLink {...props}>
      <ButtonText bold={true}>{message || children}</ButtonText>
    </StyledExternalBtnLink>
  );
};

export const ExternalLink = props => {
  const { message, children } = props;
  return (
    <StyledExternalLink {...props}>
      <ButtonText>{message || children}</ButtonText>
    </StyledExternalLink>
  );
};
