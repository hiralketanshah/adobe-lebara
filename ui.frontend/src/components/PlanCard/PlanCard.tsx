import React from "react";
import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import { PlanCardProps } from "./types";
import Button from "../Button/Button";
import lebaraColor from "../../color";

const PlanCard: React.FC<PlanCardProps> = ({
  price,
  duration,
  description,
  data,
  color,
}) => {
  return (
    <Box
      boxShadow="md"
      gap={0}
      paddingInline={2.5}
      bg="#e2d7d7"
      borderRadius={8}
      alignItems="center"
      mb="20px"
      h="92px"
      display="flex"
      flexDirection="row"
    >
      <Box
        display="flex"
        marginLeft="23px"
        alignItems="start"
        flexDirection="column"
      >
        <Box
          d={{ base: "none", md: "flex" }}
          alignItems="baseline"
          color="lebaraChambray.600"
        >
          <Box
            as="h3"
            fontSize="30px"
            padding="0px 4px 0px 2px"
            fontWeight="bold"
            color={lebaraColor.fuschia[500]}
          >
            {data}
          </Box>
        </Box>
        <Box>
          <Text
            color={lebaraColor.bodyCopy}
            type="caption"
            fontSize="14px"
            fontWeight="bold"
          >
            {description}
          </Text>
        </Box>
      </Box>

      <Divider
        my={3.5}
        orientation="vertical"
        borderWidth="0.5px"
        borderColor={lebaraColor.border}
        borderStyle="solid"
        h="50px"
        ml="30px"
      />

      <Box d="flex" mr="26px" alignItems="center">
        <Box
          d="flex"
          as="h3"
          fontSize="30px"
          pr="4px"
          pl="2px"
          fontWeight="bold"
          mr="32px"
          color={lebaraColor.navy}
        >
          €{price}
        </Box>
        <Button
          variant="solid"
          w="134px"
          background={lebaraColor.lebaraChambray[500]}
          borderRadius="12px"
          border="0px"
          color={lebaraColor.white}
        >
          Buy Plan
        </Button>
      </Box>
    </Box>
  );
};
export default PlanCard;
PlanCard.defaultProps = {
  price: 10,
  duration: "7 Days",
  description: "+ Unlimited calls",
  data: "3GB",
  color: "red",
};
