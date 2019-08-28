import styled from 'styled-components';
import { styles } from 'jdb-components';
import { Link } from 'react-router-dom';
const {
  helpers: { buttonBoxShadow },
} = styles;

export const Logo = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export const BrandLink = styled(Link)`
  border: 1px solid ${props => props.theme.border || '#000'};
  border-radius: 50%;
  transition: none;
  width: 40px;
  height: 40px;
  &:focus {
    outline: 0;
  }
  &:active {
    transform: translateY(2px);
  }
  ${props => buttonBoxShadow(props)}
`;
