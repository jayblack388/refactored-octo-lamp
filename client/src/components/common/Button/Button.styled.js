import Color from 'color';
import styled from 'styled-components';

const white = Color('#fff');
const primary = Color('#0062ff');

export const StyledButton = styled.button`
  background-color: ${props => (props.primary ? primary.hex() : white.hex())};
  padding: 0.8rem 1.6rem;
  color: ${props => (props.primary ? white.hex() : primary.hex())};
  border: 1px solid #ebebeb;
  border-radius: 0.8rem;
  transition: none;
  cursor: pointer;
  box-shadow: 0 2px 3px #999;
  &:hover {
    background-color: ${props =>
      props.primary ? primary.lighten(0.15).hex() : white.darken(0.15).hex()};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${props =>
      props.primary ? primary.lighten(0.15).hex() : white.darken(0.15).hex()};
    box-shadow: 0 1px 2px #666;
    transform: translateY(2px);
  }
`;

export const StyledLinkButton = styled.button`
  padding: 0.8rem 1.6rem;
  color: ${props => (props.blue ? primary.hex() : '#000')};
  text-decoration: underline;
  background: none;
  border: none;
  &:active {
    color: ${props => (props.blue ? primary.darken(0.15).hex() : '#000')};
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    color: ${props => (props.blue ? primary.darken(0.15).hex() : '#000')};
  }
`;
