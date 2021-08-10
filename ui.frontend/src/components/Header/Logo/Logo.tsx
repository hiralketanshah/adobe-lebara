import React from "react";
import { Link as ChakraLink, Box } from "@chakra-ui/react";
import { HeaderProps } from "../types";
import { LogoWrapper } from "./Logo.styles";

const Logo: React.FC<HeaderProps> = ({ logoPath }) => (
  <LogoWrapper w="140px" h="30px">
    <ChakraLink>
      <img src={logoPath} alt="" width="140" height="30" />
    </ChakraLink>
  </LogoWrapper>
);

export default Logo;
