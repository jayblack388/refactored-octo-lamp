import React from 'react';
import { Button, Container } from './Header.styled';
import { BrandLink, Dropdown } from '../';
import { useGlobalState } from '../../../store/GlobalState';

const Header = props => {
  const { onLogout } = props;
  const items = [
    <Button message="Link #1" />,
    <Button message="Link #2" />,
    <Button onClick={onLogout} message="Sign Out" />,
  ];
  const [
    {
      user: {
        user: { details: user },
      },
    },
  ] = useGlobalState();
  console.log(user);
  return (
    <Container>
      <BrandLink />
      <Dropdown message={user.name} items={items} />
    </Container>
  );
};

export default Header;
