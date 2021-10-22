import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Icon } from "../Icon/Icon";
import { SuccessCardProps } from "./types";

export const SuccessCard: React.FC<SuccessCardProps> = ({
  icon = IoIosCheckmarkCircleOutline,
  title,
  subtitle,
}) => (
  <Box
    w="100%"
    p={50}
    color="white"
    bg="primary.800"
    borderRadius="lg"
    marginTop={{ md: "30px" }}
  >
    <Box d="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Icon icon={icon} h="42px" w="42px" marginTop={{ md: "45px" }} />

      <Text
        fontSize="20px"
        as="h1"
        textAlign="center"
        fontWeight="500"
        pb="15px"
        pt="20px"
        lineHeight="19px"
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          fontSize="14px"
          textAlign="center"
          lineHeight="20px"
          whiteSpace="pre-line"
          width={{ md: "48%" }}
          marginBottom={{ base: "10px", md: "30px" }}
        >
          {subtitle}
        </Text>
      )}
      <Button d={{ md: "none", base: "block" }} marginTop="20px">
        Go to Dashboard
      </Button>
    </Box>
  </Box>
);
