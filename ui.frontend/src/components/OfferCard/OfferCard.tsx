// @ts-nocheck
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { OfferCardProps } from "./types";
import Button from "../Button/Button";

const OfferCard: React.FC<OfferCardProps> = ({ image, description }) => (
  <Box
    bgImage={image}
    w="100%"
    h={270}
    textAlign="center"
    backgroundSize="cover"
  >
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      h={270}
    >
      <Text
        color="white"
        fontSize={22}
        fontWeight="semibold"
        lineHeight={1.2}
        mt="40px"
      >
        {description}
      </Text>
      <Flex gridGap={2} m="25px">
        <Button w={120}>Buy Top Up</Button>
        <Button variant="outline" w={120} color="white">
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  </Box>
);

export default OfferCard;
