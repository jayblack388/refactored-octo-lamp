import styled from 'styled-components';
import flex from '../../../utils/styles/flex';

export const Form = styled.form`
  ${props => flex(props)}
  justify-content: ${props => (props.isLogin ? 'center' : 'space-between')}
  height: 30rem;
  width: 30rem;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  border-radius: 0.4rem;
  padding: 1.5rem 2.5rem;
`;
