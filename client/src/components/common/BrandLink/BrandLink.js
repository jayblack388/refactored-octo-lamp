import React from 'react';
import { hooks, styles } from 'jdb-components';
import { BrandLink as StyledBrandLink, Logo } from './BrandLink.styled';
import white from '../../../assets/jb-white.jpg';
import black from '../../../assets/jb-black.jpg';
const { useHover } = hooks;

const BrandLink = () => {
  const [isHovered, toggleHover] = useHover();
  return (
    <StyledBrandLink to="/">
      <Logo
        src={isHovered ? black : white}
        alt="logo"
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
      />
    </StyledBrandLink>
  );
};

export default BrandLink;
