import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IconListProps } from "./types";
import PeppleImage from "./about-us-pepple.png";

const IconList: React.FC<IconListProps> = ({ items }) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    justifyContent="space-around"
    alignItems="center"
    gridGap="30px"
  >
    {items.map(({ icon, title, body, imageProps }) => (
      <Flex
        flexDirection="column"
        alignItems="center"
        key={title}
        maxWidth={{ lg: "314px" }}
      >
        <Box position="relative">
          <Image
            src={PeppleImage}
            width={{ base: 75, lg: 134 }}
            height={{ base: 71, lg: 127 }}
            fill="white"
          />
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            <Image src={icon} fill="white" {...imageProps} />
          </Box>
        </Box>
        <Text
          ml={{ base: "23px", lg: 0 }}
          mt={{ base: "5px", lg: "30px" }}
          fontWeight={{ base: 500, lg: "bold" }}
          color="white"
          fontSize={{ base: 24, lg: 32 }}
          textAlign={{ lg: "center" }}
        >
          {title}
        </Text>
        <Text
          mt={{ base: "8px", lg: "9px" }}
          color="white"
          fontSize={{ base: "14px", lg: "16px" }}
        >
          {body}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default IconList;
