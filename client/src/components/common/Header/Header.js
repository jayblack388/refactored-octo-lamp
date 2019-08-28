import React, { useContext } from 'react';
import { Dropdown, ExternalBtnLink } from 'jdb-components';
import { ThemeContext } from 'styled-components';

import { BrandLink } from '../';
import { Button, Container } from './Header.styled';
import { useGlobalState } from '../../../store/GlobalState';

const Header = props => {
  const { onLogout } = props;
  const theme = useContext(ThemeContext);
  const items = [
    <Button theme={theme} fullWidth message="Link #1" />,
    <ExternalBtnLink
      theme={theme}
      fullWidth
      href="https://kinja-scraper.herokuapp.com"
      message="Kinja Scraper"
    />,
    <Button fullWidth theme={theme} onClick={onLogout} message="Sign Out" />,
  ];
  const [
    {
      user: {
        user: { details: user },
      },
    },
  ] = useGlobalState();
  const {
    name: { firstName, lastName },
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
