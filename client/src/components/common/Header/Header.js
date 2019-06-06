import React from 'react';
import { Button, Container } from './Header.styled';
import { BrandLink, Dropdown, ExternalBtnLink } from '../';
import { useGlobalState } from '../../../store/GlobalState';

const Header = props => {
  const { onLogout } = props;
  const items = [
    <Button fullWidth message="Link #1" />,
    <ExternalBtnLink
      fullWidth
      href="https://kinja-scraper.herokuapp.com"
      message="Kinja Scraper"
    />,
    <Button fullWidth onClick={onLogout} message="Sign Out" />
  ];
  const [
    {
      user: {
        user: { details: user }
      }
    }
  ] = useGlobalState();
  const {
    name: { firstName, lastName }
  } = user;
  const name = `${firstName} ${lastName}`;
  return (
    <Container>
      <BrandLink />
      <Dropdown message={name} items={items} />
    </Container>
  );
};

export default Header;
