import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { SelectedPlanCardProps } from "./types";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/types";

const SelectedPlanCard: React.FC<SelectedPlanCardProps> = ({
  // isExpanded,
  // compact,
  selectedPlan,
}) => {
  // const [expanded] = useState(isExpanded);

  const selectedProduct = useSelector(
    (state: ReduxState) => state.product.product
  );

  const sharedTextStyle = {
    fontSize: "32px",
    lineHeight: "1.1",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Chiswick Grotesque Lebara",
  };

  if (!selectedProduct) {
    return ( <div></div> );
  }
  
  return (
    <Flex
      flexDirection="column"
      background="primary.800"
      p="30px 20px"
      className="expanded"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent=""
      >
          <Text
            color="lightenPrimary.500"
            fontSize="14px"
            lineHeight="2.3"
            fontWeight="bold"
            letterSpacing="0.01em"
          >
            {selectedPlan}
          </Text>
        <Flex flex="column" marginBottom="10px">
          <Heading
            as="h3"
            {...sharedTextStyle}
            pr="6px"
            pl="2px"
            whiteSpace="pre-line"
          >
            {selectedProduct}
          </Heading>
        </Flex>
      </Flex>
      {/* {expanded && (
        <Box mb={7} p="20px">
          <Text color="white">expanded content?</Text>
        </Box>
      )} */}
    </Flex>
  );
};

export default SelectedPlanCard;
