import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PromotionBannerProps } from "./types";

const PromotionBanner: React.FC<PromotionBannerProps> = ({
  title,
  description,
  fileReference
}) => (
  <Flex flexDirection="column" alignItems="center">
    <Flex
      w={{ base: "100%", lg: "846px" }}
      flexDirection="column"
      px={{ base: "20px", lg: 0 }}
      gridGap={{ base: "17px", lg: "20px" }}
      pt={{ base: "17px", lg: "20px" }}
    >
      <Box d={{ base: "none", lg: "block" }}>
        <Box
          backgroundImage={fileReference}
          backgroundRepeat="no-repeat"
          height="207px"
          borderRadius="12px"
        >
          <Text
            pt="62px"
            pl="25px"
            fontSize="32px"
            lineHeight="40px"
            letterSpacing="0.25px"
            color="white"
            fontWeight="bold"
          >
            {title}
          </Text>
          <Text
            pt="5px"
            pl="25px"
            fontSize="16px"
            lineHeight="23px"
            letterSpacing="0.15px"
            color="white"
            width={{ md: "556px" }}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Flex>
  </Flex>
);

export default PromotionBanner;