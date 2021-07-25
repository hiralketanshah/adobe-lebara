import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonProps, fontTypeDetails } from "./types";

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  const fontDetails = fontTypeDetails.button;

  return (
    <ChakraButton
      textTransform="uppercase"
      borderRadius="lg"
      fontWeight={fontDetails.weight}
      letterSpacing={fontDetails.letterSpacing}
      lineHeight="shorter"
      fontSize={fontDetails.size}
      height={45}
      {...rest}
    />
  );
};

export default Button;
