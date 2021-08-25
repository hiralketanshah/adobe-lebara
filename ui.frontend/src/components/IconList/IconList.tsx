import React from "react";
import { Box, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { IconListProps } from "./types";
import EllipseIcon from "./EllipseIcon";

const IconList: React.FC<IconListProps> = ({ uspDescription }) => (
  <Flex flexDirection={["column", "row"]} justifyContent="space-around">
    {uspDescription?.map(({ imagePath, imageDescription, imageAlt }) => (
      <Flex
        flexDirection={["row", "column"]}
        alignItems="center"
        mb={23}
        key={imageDescription}
        maxWidth={{ md: "240px" }}
      >
        <Box position="relative">
          <Icon as={EllipseIcon} width={69} height={69} fill="white" />
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            <Image
              src={imagePath}
              color="white"
              width="34"
              height="33"
              alt={imageAlt}
            />
          </Box>
        </Box>
        <Text
          ml={["23px", 0]}
          mt={{ md: 3.5 }}
          color="white"
          fontSize={{ sm: 16, md: 22 }}
          lineHeight="short"
          letterSpacing="0.07em"
          textAlign={{ md: "center" }}
        >
          {imageDescription}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default IconList;
