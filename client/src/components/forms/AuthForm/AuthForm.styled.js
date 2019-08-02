import styled from 'styled-components';
import { styles } from 'jdb-components';
const {
  helpers: { flex },
} = styles;

export const Heading = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Form = styled.form`
  ${props => flex(props)}
  justify-content: ${props => (props.isLogin ? 'center' : 'space-between')}
  width: 100%;
  @media (max-width: 960px) {
    height: 100%;
    padding: 8.5rem 3rem;
  }
`;
