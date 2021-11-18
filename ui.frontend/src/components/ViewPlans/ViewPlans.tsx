//@ts-nocheck
import React from "react";
import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import { PlanCardProps } from "./types";
import Title from "../Title/Title";
import Button from "../Button/Button";
import {globalConfigs} from  '../../GlobalConfigs.js';
const ViewPlans: React.FC<PlanCardProps> = ({
  offer,
  buttonLabel,
  unlimitedTextField,
  minutesField,
  allowanceList,
}) => {
  return (
    <Grid
      boxShadow="md"
      templateColumns="repeat(12, 1fr)"
      gap={0}
      paddingInline={2.5}
      bg="white"
      borderRadius={8}
      alignItems="center"
      w={{ md: "460px" }}
      mb="20px"
    >
      <GridItem
        colSpan={{ base: 7, md: 4 }}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box>
          <Box
            d={{ base: "flex", md: "none" }}
            alignItems="baseline"
            color="lightenPrimary.600"
          >
            <Box
              as="p"
              fontSize={{ base: "14px", md: "30px" }}
              alignItems="baseline"
              pos="relative"
              top={{ base: "-12px", md: "0" }}
              fontWeight="bold"
            >
              £
            </Box>
            <Box as="h3" fontSize="30px" pr="4px" pl="2px" fontWeight="bold">
              {offer?.cost}
            </Box>
            <Box as="p" fontSize="13px" fontWeight="semibold">
              / {offer?.validity}
            </Box>
          </Box>
          <Title
            color="lebaraBlue.600"
            type="caption"
            display={{ base: "block", md: "none" }}
          >
            {allowanceList && allowanceList[0]?.formatedValue} {minutesField}
          </Title>
        </Box>
        <Box>
          <Box
            d={{ base: "none", md: "flex" }}
            alignItems="baseline"
            color="lightenPrimary.600"
          >
            <Box
              as="h3"
              fontSize="30px"
              pr="4px"
              pl="2px"
              fontWeight="bold"
              color="fuschia.500"
            >
              {allowanceList && allowanceList[0]?.formatedValue}
            </Box>
          </Box>
          <Title
            color="bodyCopy"
            type="caption"
            fontSize="14px"
            d={{ base: "none", md: "flex" }}
          >
            {minutesField}
          </Title>
        </Box>

        <Divider
          my={3.5}
          orientation="vertical"
          color="black"
          h="50px"
          w="1px"
          ml="30px"
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 5, md: 8 }}
        d="flex"
        justifyContent={{ base: "space-around", md: "space-around" }}
      >
        <Box
          d={{ base: "none", md: "flex" }}
          as="h3"
          fontSize="30px"
          pr="4px"
          pl="2px"
          fontWeight="bold"
        >
          {globalConfigs.currencySymbol}{offer?.cost}
        </Box>
        <Button variant="solid" w="134px" onClick={() => {}}>
          {buttonLabel}
        </Button>
      </GridItem>
    </Grid>
  );
};

export default ViewPlans;
