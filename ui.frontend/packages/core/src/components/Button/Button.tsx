import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonProps } from "./types";
import { fontTypeDetails } from "../LebaraText/types";

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  const fontDetails = fontTypeDetails.button;

  return (
    <ChakraButton
      textTransform="uppercase"
      borderRadius="lg"
      _focus={{
        outline: 0,
      }}
      fontWeight={fontDetails.weight}
      letterSpacing={fontDetails.letterSpacing}
      lineHeight="shorter"
      colorScheme="primary"
      fontSize={fontDetails.size}
      height={45}
      {...rest}
    />
  );
};

export default Button;
