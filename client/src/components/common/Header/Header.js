import React from 'react';
import { Button, Container } from './Header.styled';
import { BrandLink } from '../';
import { useGlobalState } from '../../../store/GlobalState';

const Header = props => {
  const { onLogout } = props;
  const [
    {
      user: { user },
    },
  ] = useGlobalState();
  console.log(user);
  return (
    <Container>
      <BrandLink />
      <div>
        <Button message={user.details.email} />
        <Button onClick={onLogout} message="Sign Out" />
      </div>
    </Container>
  );
};

export default Header;
