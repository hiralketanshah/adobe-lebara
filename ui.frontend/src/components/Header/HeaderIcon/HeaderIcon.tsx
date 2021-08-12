import React from "react";
import { HeaderIconProps } from "../types";
import { HeaderIconWrapper, IconWrapper } from "./HeaderIcon.styles";
import IconButton from "../../IconButton/IconButton";
import { AiOutlineUser, BiSearch, RiShoppingBagLine } from "react-icons/all";

const HeaderIcon: React.FC<HeaderIconProps> = ({ accountLink }) => (
  <HeaderIconWrapper>
    <IconWrapper>
      <a href="#" style={{ textDecoration: "none" }}>
        <IconButton
          icon={<BiSearch />}
          aria-label="Search"
          variant="ghost"
          size="md"
          pl="10px"
          pr="10px"
          colorScheme="dark"
        />
      </a>
      <a href={accountLink} style={{ textDecoration: "none" }}>
        <IconButton
          colorScheme="dark"
          icon={<AiOutlineUser />}
          aria-label="Profile"
          size="md"
          pl="10px"
          pr="10px"
          variant="ghost"
        />
      </a>
      <a href="#" style={{ textDecoration: "none" }}>
        <IconButton
          colorScheme="dark"
          icon={<RiShoppingBagLine />}
          aria-label="Cart"
          size="md"
          pl="10px"
          pr="10px"
          variant="ghost"
        />
      </a>
    </IconWrapper>
  </HeaderIconWrapper>
);

export default HeaderIcon;
