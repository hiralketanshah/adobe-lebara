import React from "react";
import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import { PlanCardProps } from "./types";
import Button from "../Button/Button";
import LebaraText from "../Text/Text";

const PlanCard: React.FC<PlanCardProps> = ({
  price,
  duration,
  description,
  data,
  color,
}) => (
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
    color={color}
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
          color="lebaraChambray.600"
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
            {price}
          </Box>
          <Box as="p" fontSize="13px" fontWeight="semibold">
            {" "}
            / {duration}
          </Box>
        </Box>
        <LebaraText
          color="lebaraBlue.600"
          type="caption"
          display={{ base: "block", md: "none" }}
        >
          {data} {description}
        </LebaraText>
      </Box>
      <Box>
        <Box
          d={{ base: "none", md: "flex" }}
          alignItems="baseline"
          color="lebaraChambray.600"
        >
          <Box
            as="h3"
            fontSize="30px"
            pr="4px"
            pl="2px"
            fontWeight="bold"
            color="black"
          >
            {data}
          </Box>
        </Box>
        <LebaraText
          color="lebaraBlue.600"
          type="caption"
          d={{ base: "none", md: "flex" }}
        >
          {description}
        </LebaraText>
      </Box>

      <Divider my={3.5} orientation="vertical" color="black" h="50px" w="1px" />
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
        £{price}
      </Box>
      <Button variant="solid" w="134px">
        Buy Plan
      </Button>
    </GridItem>
  </Grid>
);

export default PlanCard;

PlanCard.defaultProps = {
  price: 10,
  duration: "7 Days",
  description: "+ Unlimited calls",
  data: "3GB",
  color: "blue",
};
