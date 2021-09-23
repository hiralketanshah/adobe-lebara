import React from "react";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { CheckboxProps } from "./types";
import { fontTypeDetails } from "../LebaraText/types";

const Checkbox: React.FC<CheckboxProps> = ({ ...rest }) => {
  const fontDetails = fontTypeDetails.caption;

  return (
    <ChakraCheckbox
      {...rest}
      colorScheme="fuschia"
      sx={{
        ".chakra-checkbox__label": {
          fontSize: fontDetails.size,
        },
      }}
    />
  );
};

export default Checkbox;
