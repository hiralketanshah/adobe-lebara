import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { CompProps } from "./types";
import Link from "../Link/Link";

const LbSectionIntro: React.FC<CompProps> = ({ 
  heading, 
  sectionHeading, 
  sectionSubHeading, 
  description,
  linkPath,
  linkLabel,
  noPadding }) => {
  
  const linkStyles = {
    fontSize: "14px",
    letterSpacing: "0.01em",
    fontWeight: "bold",
  };

  const link = {
    children: linkLabel,
    href: linkLabel,
    color:"#ff3182"
  };
  
  return (
    <>
      <Box
        backgroundColor="lightenPrimary.50"
        backgroundPosition="center right"
        backgroundRepeat="no-repeat"
        py={noPadding ? {} : { base: "30.68px", lg: "60px" }}
        px={noPadding ? {} : { base: "20px", lg: "80px" }}
      >
        {heading && (
          <Text
            color="primary.600"
            as="h2"
            fontWeight="bold"
            lineHeight={{ base: "40px", lg: "50px" }}
            fontSize={{ base: 32, lg: 47 }}
            mb={{ base: "11.11px", lg: "5px" }}
          >{heading}</Text>
        )}
        <Flex flexDir="column" align="stretch">
          {description && (
            <Text
              as="h3"
              mb={{ base: "12.11px", lg: "10px" }}
              lineHeight={{ base: "22px", lg: "30px" }}
              fontSize={{ base: "20px", lg: "24px" }}
              fontWeight="500"
            >
              {description}
            </Text>
          )}
          {sectionHeading && (
            <Text fontWeight="bold" fontSize="16px" lineHeight="22px" mb="8px">
              {sectionHeading}
            </Text>
          )}
          {sectionSubHeading && (
            <Box d={{ lg: "flex" }} justifyContent={{ lg: "space-between" }}>
              <Text
                lineHeight={{ base: "22px", lg: "30px" }}
                fontSize="16px"
                mb={{ base: "15.31px", lg: 0 }}
              >
                {sectionSubHeading}
              </Text>
              {linkLabel && linkPath && <Link marginBottom="20px" {...linkStyles} {...link} />}
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default LbSectionIntro;
