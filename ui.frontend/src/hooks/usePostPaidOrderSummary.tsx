import { useSelector } from "react-redux";
import { ReduxState } from "../redux/types";
import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@chakra-ui/react";
import LebaraText from "../components/LebaraText/LebaraText";
import { formatNumber } from "../utils/formatNumber";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/all";
import OrderSummary from "../components/PostpaidPersonalDetails/OrderSummary";
import { globalConfigs } from "../GlobalConfigs";

const iconButtonProps = {
  variant: "ghost",
  colorScheme: "teal",
  fontSize: "20px",
};

function usePostPaidOrderSummary(orderTotal?: string, rest?: any) {
  const selectedPlan = useSelector(
    (state: ReduxState) => state.product?.product?.selectedPlan
  );
  const [orderSummaryFlag, setOrderSummaryFlag] = useState(false);
  return (
    <Box mt="40px">
      <Box borderTop="1px solid #F4F4F4;">
        <Box
          pt="18px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box px={{ base: "13px", md: "20px" }}>
            <LebaraText
              type="subtitle2"
              lineHeight="20px"
              fontWeight="bold"
              color="black"
              fontSize="14px"
            >
              {orderTotal}
            </LebaraText>
          </Box>
          <Box>
            {!orderSummaryFlag ? (
              <LebaraText
                type="subtitle2"
                fontSize="14px"
                lineHeight="20px"
                display="inline-block"
                fontWeight="700"
              >
                {formatNumber(
                  selectedPlan && selectedPlan.cost / 100
                    ? selectedPlan.cost / 100
                    : 0
                )}{" "}
                {globalConfigs.currencySymbol}
              </LebaraText>
            ) : (
              <></>
            )}

            <IconButton
              {...iconButtonProps}
              aria-label="Toggle section"
              onClick={() => setOrderSummaryFlag(!orderSummaryFlag)}
              icon={
                !orderSummaryFlag ? (
                  <RiArrowDownSLine size={24} color="#646464" />
                ) : (
                  <RiArrowUpSLine size={24} color="#646464" />
                )
              }
            />
          </Box>
        </Box>
        <Collapse in={orderSummaryFlag} animateOpacity dir="down">
          <OrderSummary {...rest}/>
        </Collapse>
      </Box>
    </Box>
  );
}

export default usePostPaidOrderSummary;
