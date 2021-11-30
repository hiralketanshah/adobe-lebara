import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { RewardOverviewProps, TableItems } from "./types";

const RewardOverview: React.FC<RewardOverviewProps> = ({
  heading,
  description,
  columnHeader1,
  columnHeader2,
  tableItems,
}) => (
  {heading && <Box
    maxWidth={{ base: "405px", md: "none" }}
    backgroundColor={{ base: "none", md: "grey.50" }}
    textAlign={{ md: "center" }}
    padding={{ base: "15px", md: "30px" }}
  >
    <Heading
      as="h6"
      color="primary.500"
      fontSize={{ base: "32px" }}
      marginBottom="10px"
    >
      {heading}
    </Heading>
    <Text fontSize={{ base: "20px" }} marginBottom="15px">
      {description}
    </Text>

    <Box
      borderTop={{ base: "1px", md: "none" }}
      borderBottom={{ base: "1px", md: "none" }}
      borderTopColor={{ base: "lightenPrimary.50" }}
      borderBottomColor={{ base: "lightenPrimary.50" }}
      marginBottom="20px"
      margin={{ md: "auto" }}
      width={{ md: "70%" }}
    >
      <Box
        borderBottom={{ base: "1px", md: "none" }}
        borderBottomColor={{ base: "greySuccess" }}
        display="flex"
        lineHeight="40px"
        marginBottom={{ base: "0px", md: "15px" }}
      >
        <Text
          width={{ base: "50%", md: "70%" }}
          borderRight={{ base: "1px", md: "none" }}
          borderRightColor="greySuccess"
          mx="20px"
          color="primary.500"
          textAlign={{ base: "initial", md: "left" }}
          marginLeft={{ base: "20px", md: "30px" }}
        >
          {columnHeader1}
        </Text>
        <Text color="primary.500">{columnHeader2}</Text>
      </Box>

      {tableItems?.map((tableItem: TableItems, idx) => (
          <Box
            borderBottom={{ base: "1px", md: "none" }}
            borderBottomColor={{ base: "greySuccess" }}
            display="flex"
            backgroundColor={{ md: "white" }}
            marginBottom={{ base: "0px", md: "15px" }}
            lineHeight="40px"
            padding={{ base: "0", md: "12px" }}
            borderRadius={{ base: "0", md: "12px" }}
            textAlign={{ base: "initial", md: "left" }}
            fontSize={{ base: "14px", md: "20px" }}
          >
            <Text
              width={{ base: "50%", md: "70%" }}
              borderRight={{ base: "1px", md: "none" }}
              borderRightColor="greySuccess"
              mx="20px"
            >
              {tableItem.label1}
            </Text>
            <Text fontWeight="bold">{tableItem.label2}</Text>
          </Box>
      ))}

    </Box>
  </Box>
  }
);

export default RewardOverview;
