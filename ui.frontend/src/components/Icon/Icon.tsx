import React from "react";
import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "./types";

export const Icon: React.FC<IconProps> = ({ icon, ...rest }) => (
  <ChakraIcon as={icon} {...rest} />
);
