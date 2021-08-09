import React from "react";
import { Link as ChakraLink, Box } from "@chakra-ui/react";
import { HeaderProps } from "../types";

const Logo: React.FC<HeaderProps> = ({ logoPath }) => (
  <Box w="140px" h="30px">
    <ChakraLink>
      <img src={logoPath} alt="" width="140" height="30" />
    </ChakraLink>
  </Box>
);

export default Logo;
