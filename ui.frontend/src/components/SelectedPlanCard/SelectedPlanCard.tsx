import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { SelectedPlanCardProps } from "./types";
import { useSelector } from "react-redux";

const SelectedPlanCard: React.FC<SelectedPlanCardProps> = ({
  selectedPlanLabel,
}) => {

  const selectedProduct = useSelector(
    (state: any) => state.product.product
  );

  const sharedTextStyle = {
    fontSize: "16px",
    lineHeight: "1.1",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Chiswick Grotesque Lebara",
  };
  if (!selectedProduct) {
    return ( <></> );
  }
  
  return (
    <Flex
      flexDirection="column"
      background="primary.800"
      p="15px 18px 5px"
      className="compact"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent={"space-between"}
      >
          <Text
            color="lightenPrimary.500"
            fontSize="14px"
            lineHeight="2.3"
            fontWeight="bold"
            letterSpacing="0.01em"
          >
            {selectedPlanLabel}
          </Text>
        <Flex flex="column" marginBottom="10px">
          <Heading
            as="h3"
            {...sharedTextStyle}
            pr="6px"
            pl="2px"
            whiteSpace="pre-line"
          >
           {selectedProduct?.product}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SelectedPlanCard;
