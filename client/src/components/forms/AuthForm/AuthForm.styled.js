import styled from 'styled-components';
import flex from '../../../utils/styles/flex';

export const Heading = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Form = styled.form`
  ${props => flex(props)}
  justify-content: ${props => (props.isLogin ? 'center' : 'space-between')}
  height: 30rem;
  width: 25rem;
  box-shadow: inset 0.3rem 0 0.6rem rgba(0, 0, 0, 0.5);
  border-radius: 0.4rem;
  padding: 1.5rem 2.5rem;
  @media (max-width: 960px) {
    height: 100%;
    padding: 8.5rem 3rem;
  }
`;
