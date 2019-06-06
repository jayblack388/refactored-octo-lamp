import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${props =>
    props.primary ? props.theme.primaryColor : props.theme.white};
  border-radius: 0.8rem;
  border: 1px solid ${props => props.theme.border || '#ebebeb'};
  box-shadow: 0 2px 3px ${props => props.theme.dark || '#000'};
  color: ${props =>
    props.primary ? props.theme.white : props.theme.primaryColor};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.8rem 1.6rem;
  transition: none;
  ${props => (props.fullWidth ? 'width: 100%' : '')};
  &:hover {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
    box-shadow: 0 1px 2px ${props => props.theme.lightens.dark || '#000'};
    transform: translateY(2px);
  }
`;

export const StyledLinkButton = styled.button`
  background: none;
  border: none;
  color: ${props => (props.blue ? props.theme.primaryColor : props.theme.dark)};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.8rem 1.6rem;
  text-decoration-color: ${props =>
    props.blue ? props.theme.primaryColor : props.theme.dark};
  text-decoration: underline;
  &:active {
    color: ${props =>
      props.blue
        ? props.theme.darkens.primaryColor
        : props.theme.lightens.dark};
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    color: ${props =>
      props.blue
        ? props.theme.darkens.primaryColor
        : props.theme.lightens.dark};
  }
`;
