import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { OrderSummaryProps } from "./types";
import { formatNumber } from "../../utils/formatNumber";
import { ReduxState } from "../../redux/types";
import { globalConfigs } from "../../GlobalConfigs";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  yourOrderContractdurationLabel,
  yourOrderDataLabel,
  yourOrderInternationalMinLabel,
  yourOrderMinutesInGermany,
  yourOrderPerMonthOrderTotalLabel,
  yourOrderOneTimeActivationFeeLabel,
  yourOrderOneTimeActivationFee,
  yourOrdersimPlanLabel,
  yourOrderMinutesInGermanyValue
}) => {
  const totalTextStyle = {
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "0.5px",
    color: "black",
  };

  const selectedPlan = useSelector(
    (state: ReduxState) => state.product.product?.selectedPlan
  );

  const values = useSelector(
    (state: ReduxState) => state.product.product?.planValues
  );
  return (
    <Box
      backgroundColor="white"
      width="100%"
      py="17px"
      marginTop="22px"
      borderRadius="8px"
      border={{ base: "none", md: "0.5px solid" }}
      borderColor={{ md: "grey.200" }}
    >
      {selectedPlan && selectedPlan.name && (
        <Flex
          mt="9px"
          ml="17px"
          mr="15px"
          pb="9px"
          borderBottom="0.25px solid"
          borderColor="grey.100"
        >
          <Text {...totalTextStyle}>{yourOrdersimPlanLabel}</Text>
          <Text {...totalTextStyle} marginLeft="auto">
            {selectedPlan.name}
          </Text>
        </Flex>
      )}
      {selectedPlan && values?.planDuration && (
        <Flex
          mt="9px"
          ml="17px"
          mr="15px"
          pb="9px"
          borderBottom="0.25px solid"
          borderColor="grey.100"
        >
          <Text {...totalTextStyle}>{yourOrderContractdurationLabel}</Text>
          <Text {...totalTextStyle} marginLeft="auto">
            {values.planDuration === "Month" ? "1 Month" : values.planDuration}
          </Text>
        </Flex>
      )}
      {selectedPlan && values?.data && (
        <Flex
          mt="9px"
          ml="17px"
          mr="15px"
          pb="9px"
          borderBottom="0.25px solid"
          borderColor="grey.100"
        >
          <Text {...totalTextStyle}>{yourOrderDataLabel}</Text>
          <Text {...totalTextStyle} marginLeft="auto">
            {`${values.data} GB`}
          </Text>
        </Flex>
      )}
      {selectedPlan && values?.minutes && (
        <Flex
          mt="9px"
          ml="17px"
          mr="15px"
          pb="9px"
          borderBottom="0.25px solid"
          borderColor="grey.100"
        >
          <Text {...totalTextStyle}>{yourOrderInternationalMinLabel}</Text>
          <Text {...totalTextStyle} marginLeft="auto">
            {values.minutes}
          </Text>
        </Flex>
      )}
      <Flex
        mt="9px"
        pb="9px"
        borderBottom={{ base: "0.5px solid", md: "1.5px solid" }}
        borderColor={{ base: "grey.100", md: "grey.200" }}
      >
        <Text {...totalTextStyle} ml="17px">
          {yourOrderMinutesInGermany}
        </Text>
        <Text {...totalTextStyle} mr="15px" marginLeft="auto">
          {yourOrderMinutesInGermanyValue}
        </Text>
      </Flex>
      <Flex mt="9px" pl="17px" pr="15px">
        <Text {...totalTextStyle}>{yourOrderPerMonthOrderTotalLabel}</Text>
        <Text {...totalTextStyle} marginLeft="auto">
          {formatNumber(
            selectedPlan && values?.planDuration && selectedPlan.cost / 100
              ? selectedPlan.cost / 100
              : 0
          )}{" "}
          {globalConfigs.currencySymbol}
        </Text>
      </Flex>
      <Flex mt="11px" pl="17px" pr="15px" pb="9px">
        <Text
          fontSize="12px"
          lineHeight="17px"
          letterSpacing="0.23px"
          fontFamily="Roboto"
          color="black"
        >
         {yourOrderOneTimeActivationFeeLabel}
        </Text>
        <Text {...totalTextStyle} marginLeft="auto">
          {yourOrderOneTimeActivationFee} {globalConfigs.currencySymbol}
        </Text>
      </Flex>
    </Box>
  );
};

export default OrderSummary;
