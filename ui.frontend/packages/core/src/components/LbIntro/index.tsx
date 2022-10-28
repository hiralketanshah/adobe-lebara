import React from "react";
import { Text } from "@chakra-ui/react";
import { CompProps } from "./types";

const LbIntro: React.FC<CompProps> = ({ heading, description }) => {
  return (
    <>
      {heading && <Text
        fontSize="32px"
        lineHeight="40px"
        letterSpacing="0.25px"
        color="primary.500"
        fontWeight="bold"
        mb="10px"
      >
        {heading}
      </Text>}
      {description && <Text
        fontSize={{ base: "14px", lg: "16px" }}
        lineHeight={{ base: "20px", lg: "23px" }}
        color="primary.800"
        mb="18px"
      >{description}
      </Text>}
    </>
  );
};

export default LbIntro;
