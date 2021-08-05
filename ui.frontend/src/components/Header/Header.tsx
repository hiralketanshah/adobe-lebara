import React from "react";
import { HeaderProps } from "./types";
import Logo from "../Logo/Logo";
import { MenuWrapper, HeaderWrapper } from "./Header.styles";

const Header: React.FC<HeaderProps> = ({ logoPath }) => (
  <HeaderWrapper>
    <MenuWrapper>
      <Logo logoPath={logoPath} />
    </MenuWrapper>
  </HeaderWrapper>
);

export default Header;
