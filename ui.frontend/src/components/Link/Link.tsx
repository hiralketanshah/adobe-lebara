import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { LinkProps } from "./types";

const Link: React.FC<LinkProps> = ({ ...rest }) => (
  <ChakraLink color="fuschia.500" {...rest} />
);

export default Link;
