import React from "react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { ImageProps } from "./types";

export const Image: React.FC<ImageProps> = ({ ...rest }) => (
  <ChakraImage {...rest} />
);
