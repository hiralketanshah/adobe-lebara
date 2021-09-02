import React from "react";
import { Text } from "@chakra-ui/react";
import { fontTypeDetails, LebaraTextProps } from "./types";

const Title: React.FC<LebaraTextProps> = ({ type, ...rest }) => {
  const fontDetails = fontTypeDetails[type];
  return (
    <Text
      fontWeight={fontDetails.weight}
      fontSize={fontDetails.size}
      letterSpacing={fontDetails.letterSpacing}
      {...rest}
    />
  );
};

export default Title;
