import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { MiniFooterProps } from "./types";
import Link from "../Link/Link";

const MiniFooter: React.FC<MiniFooterProps> = ({helpText, lookText, links}) => (
  <Flex
    px={{ base: "20px", lg: "90px" }}
    bg="primary.800"
    color="white"
    h={{ base: "80px", lg: "102px" }}
    flexDirection={{ base: "column", md: "row" }}
    alignItems={{ base: "initial", md: "center" }}
    justifyContent={{ base: "center", md: "initial" }}
  >
    <Text
      fontFamily={{ base: "Roboto", lg: "Chiswick Grotesque Lebara" }}
      fontSize={{ base: "16px", lg: "32px" }}
      lineHeight={{ base: "25px", lg: "4px" }}
      fontWeight="bold"
      letterSpacing={{ base: "0.01em", lg: "0.25px" }}
      textTransform={{ base: "uppercase", lg: "none" }}
    >
      {helpText}
    </Text>
    <Text
      fontFamily="Roboto"
      fontWeight={{ base: "400", lg: "500" }}
      fontSize={{ base: "14px", lg: "24px" }}
      lineHeight={{ base: "20px", lg: "30px" }}
      letterSpacing="0.25px"
      ml={{ base: "initial", md: "50px" }}
      dangerouslySetInnerHTML={{ __html: lookText || ''}}
    >
      {links?.map((list) => (
        <Link href={list.link} color="deeppink">
          {list.label}
        </Link>
      ))}
    </Text>
  </Flex>
);

export default MiniFooter;
