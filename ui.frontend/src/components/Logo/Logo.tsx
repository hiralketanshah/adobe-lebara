import React from "react";
import { Link as ChakraLink, Box } from "@chakra-ui/react";
import { LogoProps } from "./types";

const Logo: React.FC<LogoProps> = ({ logoPath }) => (
  <Box w="140px" h="30px">
    <ChakraLink>
      <img src={logoPath} alt="Logo" width="140" height="30" />
    </ChakraLink>
  </Box>
);

export default Logo;
