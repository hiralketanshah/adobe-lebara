// @ts-nocheck

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import IconList from "../IconList/IconList";

import { UspProps } from "./types";

const Usp: React.FC<UspProps> = ({
  backgroundimage,
  uspDescription,
  title,
}) => {
  return (
    <Box
      backgroundImage={backgroundimage}
      backgroundSize="cover"
      py="50px"
      px="30px"
      textAlign={{ md: "center" }}
    >
      <Text color="white" as="h3" fontSize={{ md: 32, sm: 22 }} mb="40px">
        {title}
      </Text>
      <IconList uspDescription={uspDescription} />
    </Box>
  );
};

export default Usp;
