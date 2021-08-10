import React from "react";
import { HeaderMenuProps } from "./types";
import { MenuWrapper, MenuText, ChakraLink } from "./HeaderMenu.styles";

const Header: React.FC<HeaderMenuProps> = ({ menuList }) => {
  return (
    <MenuWrapper>
      {menuList?.map((item) => (
        <ChakraLink href={item?.url}>
          <MenuText>{item?.title}</MenuText>
        </ChakraLink>
      ))}
    </MenuWrapper>
  );
};
export default Header;
