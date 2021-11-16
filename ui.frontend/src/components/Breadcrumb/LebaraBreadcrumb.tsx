import React from "react";
import { Box, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LebaraBreadcrumbProps } from "./types";
import Breadcrumb from "./Breadcrumb";

const LebaraBreadcrumb: React.FC<LebaraBreadcrumbProps> = ({ items }) => (
  <Breadcrumb
    backgroundColor="grey.50"
    d="flex"
    alignItems="center"
    height={{ base: "25px", lg: "40px" }}
    paddingX={{ base: "28px", lg: "6.1%" }}
    {...{
      separator: (
        <Box mx="9px" color="primary.500">
          /
        </Box>
      ),
      fontSize: "sm",
      spacing: 0,
    }}
  >
    Hi
    {items?.map((t, index) => {
      const isCurrentPage = index === items.length - 1;
      return (
        <BreadcrumbItem isCurrentPage={isCurrentPage}>
          HLI
          {isCurrentPage && (
            <Text color="secondary.500" fontWeight="500" fontSize={12}>
              {t.title}
            </Text>
          )}
          {!isCurrentPage && (
            <BreadcrumbLink
              _focus={{ boxShadow: "unset" }}
              as={Link}
              to={t.url || "/"}
              color="primary.500"
              fontWeight="500"
              isCurrentPage={isCurrentPage}
              fontSize={12}
            >
              {t.title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );
    })}
  </Breadcrumb>
);

export default LebaraBreadcrumb;
