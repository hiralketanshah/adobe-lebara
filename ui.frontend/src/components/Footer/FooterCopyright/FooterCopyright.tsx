import React from "react";

import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { FooterCopyrightProps } from "./types";

const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  links,
  copyrightText,
}) => {
  return (
    <>
      <Divider mt="2em" />
      <Box display={{ md: "block", base: "none" }}>
        <Flex py="25px" color="grey.300">
          {links?.map((item) => (
            <a href={item?.link} style={{ textDecoration: "none" }}>
              <Text fontSize={12} textAlign="left" ml="60px">
                {item?.label}
              </Text>
            </a>
          ))}
          <Spacer />
          <Text fontSize={12} textAlign="right" mr="60px">
            {copyrightText}
          </Text>
        </Flex>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Text fontSize={12} textAlign="center" py="25px">
          {copyrightText}
        </Text>
      </Box>
    </>
  );
};

export default FooterCopyright;
