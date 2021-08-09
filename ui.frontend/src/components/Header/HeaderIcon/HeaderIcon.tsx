import React from "react";
import { HeaderIconProps } from "../types";
import { HeaderIconWrapper, IconWrapper } from "./HeaderIcon.styles";
import IconButton from "../../IconButton/IconButton";
import { AiOutlineUser, BiSearch, RiShoppingBagLine } from "react-icons/all";

const HeaderIcon: React.FC<HeaderIconProps> = ({}) => (
  <HeaderIconWrapper>
    <IconWrapper>
      <IconButton
        icon={<BiSearch />}
        aria-label="Search"
        variant="ghost"
        size="md"
        pl="10px"
        pr="10px"
        colorScheme="dark"
      />
      <IconButton
        colorScheme="dark"
        icon={<AiOutlineUser />}
        aria-label="Profile"
        size="md"
        pl="10px"
        pr="10px"
        variant="ghost"
      />
      <IconButton
        colorScheme="dark"
        icon={<RiShoppingBagLine />}
        aria-label="Cart"
        size="md"
        pl="10px"
        pr="10px"
        variant="ghost"
      />
    </IconWrapper>
  </HeaderIconWrapper>
);

export default HeaderIcon;
