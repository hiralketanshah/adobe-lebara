// @ts-nocheck

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import IconList from "../IconList/IconList";
import { UspProps } from "./types";

const Usp: React.FC<UspProps> = ({
  uspList,
  title,
}) => {

  const imageProps = {
    width: {
       base: "30px",
       lg: "47px",
     },
     height: {
       base: "auto",
       lg: "auto",
     },
  };

 const uspListWithImageProps = uspList.map((e: any) => {
   e.imageProps = imageProps;
   return e;
 }
 );

  return (
    <Box
    backgroundColor="primary.500"
    py={{ base: "42px", lg: "60px" }}
    px="35px"
    textAlign={{ base: "center" }}
  >
    <Text
      color="white"
      as="h3"
      fontSize={{ base: 32, lg: 47 }}
      lineHeight={{ base: "40px", lg: "50px" }}
      mb={{ base: "30px", lg: "41px" }}
      textAlign="center"
      fontWeight="bold"
    >
      {title}
    </Text>
    <IconList items={uspListWithImageProps} />
  </Box>
  );
};

export default Usp;
