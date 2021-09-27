import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { CallPricesProps } from "./types";
import Select from "../Select/Select";

const CallPrices: React.FC<CallPricesProps> = ({
  image,
  countries,
  title,
  placeholder,
}) => (
  <Flex textAlign={{ base: "center", lg: "left" }}>
    <Image src={image} w="60%" d={{ base: "none", lg: "block" }} />
    <Box
      py={{ base: "30px", lg: "84px" }}
      px={{ base: "30px", lg: "84px" }}
      w="100%"
      bg="grey.50"
    >
      <Box maxW="368px">
        <Heading
          color="primary.500"
          fontSize={32}
          lineHeight="40px"
          letterSpacing="0.25px"
          mb="25px"
        >
          {title}
        </Heading>
        <Select
          formControlBorderRadius="12px"
          options={countries}
          placeholder={placeholder}
          color="primary.800"
          fontWeight="normal"
          fontSize="16px"
        />
      </Box>
    </Box>
  </Flex>
);

export default CallPrices;
