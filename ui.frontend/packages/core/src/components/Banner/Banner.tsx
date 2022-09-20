import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { BannerProps } from "./types";
import CheckMark from "./checkmark.png";

const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  title,
  knowMoreText,
  text,
}) => {
  const moreDetailsStyles = {
    fontSize: "14px",
    letterSpacing: "0.1px",
    fontWeight: "bold",
    color: "secondary.500",
    lineHeight: "20px",
    cursor: "pointer",
  };

  return (
    <Box
      backgroundColor={{ base: "lightenPrimary.50", md: "white" }}
      pl={{ base: "17px", md: "150px" }}
      pt={{ base: "28px", md: "48px" }}
      pb={{ base: "28px", md: "48px" }}
      pr={{ base: "23px", md: "150px" }}
      width={{ base: "100%", md: "1000px" }}
    >
      <Box
        p={{ base: "15px", md: "23px" }}
        backgroundImage={{
          base: backgroundImage,
          md: backgroundImage,
        }}
        height={{ base: "139px", md: "212px" }}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
        borderRadius="12px"
        maxW={{ base: "100%" }}
        mb={{ md: "29px" }}
      >
        <Text
          fontWeight="500"
          fontSize="24px"
          lineHeight="30px"
          letterSpacing="0.25px"
          color="primary.800"
        >
          {title}
        </Text>
        {text?.map((item) => (
          <Flex alignItems="baseline">
            <Box height="12px" width="12px">
              <img src={CheckMark} alt="Check" />
            </Box>
            <Text
              mt={{ base: "8px", md: "12px" }}
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.25px"
              color="primary.800"
              ml="7px"
            >
              {item}
            </Text>
          </Flex>
        ))}
        <Text {...moreDetailsStyles} mt={{ base: "8px", md: "12px" }}>
          {knowMoreText}
        </Text>
      </Box>
    </Box>
  );
};
export default Banner;
