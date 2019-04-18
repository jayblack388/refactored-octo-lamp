import React from 'react';
import { Wrapper as StyledWrapper } from './Wrapper.styled';

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
