// @ts-nocheck

import React from "react";
import { Text } from "@chakra-ui/react";
import { fontTypeDetails, LebaraTextProps } from "./types";

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
