import React from "react";
import { Radio as ChakraRadio } from "@chakra-ui/react";
import { RadioButtonProps } from "./types";
import { fontTypeDetails } from "../LebaraText/types";

const RadioButton: React.FC<RadioButtonProps> = ({ ...rest }) => {
  const fontDetails = fontTypeDetails.caption;

  return (
    <ChakraRadio
      {...rest}
      colorScheme="lightenPrimary"
      sx={{
        ".chakra-checkbox__label": {
          fontSize: fontDetails.size,
        },
      }}
    />
  );
};

export default RadioButton;
