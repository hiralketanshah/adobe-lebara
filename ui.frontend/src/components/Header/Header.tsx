import React from "react";
import { HeaderProps } from "./types";
import Logo from "./Logo/Logo";
import {
  MenuWrapper,
  HeaderWrapper,
  ButtonWrapper,
  IconWrapper,
  HeaderButtonWrapper,
  IconContainer,
} from "./Header.styles";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import HeaderIcon from "./HeaderIcon/HeaderIcon";
import { GiHamburgerMenu } from "react-icons/all";

const Header: React.FC<HeaderProps> = ({
  items,
  logoPath,
  topupCtaText,
  topupCtaLink,
}) => {
  return (
    <HeaderWrapper>
      <IconContainer>
        <IconWrapper
          w="40px"
          h="40px"
          pr="0px"
          icon={<GiHamburgerMenu />}
          aria-label="Search"
          variant="ghost"
          color="white"
        />
      </IconContainer>
      {logoPath && <Logo logoPath={logoPath} />}
      <MenuWrapper>
        {items?.length ? <HeaderMenu menuList={items} /> : <></>}
        {topupCtaText && (
          <HeaderButtonWrapper>
            <ButtonWrapper width="102px">{topupCtaText}</ButtonWrapper>
          </HeaderButtonWrapper>
        )}
        <HeaderIcon />
      </MenuWrapper>
    </HeaderWrapper>
  );
};

export default Header;
