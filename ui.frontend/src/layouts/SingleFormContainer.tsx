import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { BuyPlanLayoutProps } from "./types";

const SingleFormContainer: React.FC<BuyPlanLayoutProps> = ({
  children,
  noPadding,
  fullWidth,
  maxW,
}) => {
  return (
    <Box
      className="single-form-container"
      px={noPadding ? 0 : "20px"}
      bgColor="lightenPrimary.50"
    >
      <Center>
        <Box
          maxW={maxW !== undefined ? maxW : fullWidth ? "100% " : "846px"}
          w="100%"
          bg={fullWidth || noPadding ? {} : { lg: "white" }}
          px={fullWidth || noPadding ? {} : { lg: "60px" }}
          mb={fullWidth || noPadding ? {} : { lg: "20px" }}
        >
          {children}
        </Box>
      </Center>
    </Box>
  );
};

export default SingleFormContainer;
