// @ts-nocheck

import React from "react";
import { Text } from "@chakra-ui/react";
import { fontTypeDetails, LebaraTextProps } from "./types";
// import color from "../../color";

const LebaraText: React.FC<LebaraTextProps> = ({
  text,
  type,
  linkURL,
  ...rest
}) => {
  const fontDetails = fontTypeDetails[type];
  return (
    <>
      {linkURL && text && (
        <a href={linkURL} style={{ textDecoration: "none" }}>
          <Text
            as={type}
            color="lightenPrimary.600"
            mb="40px"
            fontWeight={fontDetails?.weight}
            fontSize={fontDetails?.size}
            letterSpacing={fontDetails?.letterSpacing}
            {...rest}
          >
            {text}
          </Text>
        </a>
      )}
      {!linkURL && text && (
        <Text
          as={type}
          color="lightenPrimary.600"
          mb="40px"
          fontWeight={fontDetails?.weight}
          fontSize={fontDetails?.size}
          letterSpacing={fontDetails?.letterSpacing}
          {...rest}
        >
          {text}
        </Text>
      )}
    </>
  );
};

export default LebaraText;
