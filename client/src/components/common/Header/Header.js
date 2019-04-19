import React from 'react';
import { Container } from './Header.styled';
import { Button } from '../';
import { useRouter } from '../../../utils/customHooks';

const Header = props => {
  const { onLogout } = props;
  const { history, location, match } = useRouter();

  const logOut = () => {
    onLogout();
    history.push('/login');
  };
  return (
    <Container>
      <Button onClick={logOut} message="Sign Out" />
    </Container>
  );
};

export default Header;
