import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import NextBillLogo from "../../assets/images/nextBill.png";
import { NextBillProps } from "./types";
import { globalConfigs as GC } from "../../GlobalConfigs";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import moment from "moment";
import { useHistory } from "react-router-dom";
const NextBill: React.FC<NextBillProps> = ({
  title,
  durationLabel,
  totalEstimatedLabel,
  additionalChargesLabel,
  monthlyChargesLabel,
  buttonLabel,
  buttonLink,
  hideButton
}) => {
  const textStyle = {
    fontSize: "14px",
    color: "primary.800",
    lineHeight: "20px",
  };
  const history = useHistory();
  const [getDashboardData] = useGetDashboardData();
  const isPostPaid = !!(getDashboardData && getDashboardData.bills);
  if (isPostPaid && getDashboardData.bills.length > 0) {
    return (
      <Flex flexDirection="column" alignItems="center">
        <Flex
          w={{ base: "100%", lg: "846px" }}
          flexDirection="column"
          px={{ base: "20px", lg: 0 }}
          gridGap={{ base: "17px", lg: "20px" }}
          pt={{ base: "17px", lg: "20px" }}
        >
          <Box
            minW={{ base: "100%", lg: "305px" }}
            px="15px"
            py="20px"
            borderRadius="7px"
            backgroundColor="white"
          >
            <Flex justifyContent="space-between" flexDirection="column" h="100%">
              <Box>
                <Flex alignItems="center">
                  <Flex alignItems="baseline">
                    <img
                      src={NextBillLogo}
                      alt="Next Bill"
                      height="15px"
                      width="17px"
                    />
                    <Text
                      ml="7px"
                      fontWeight="bold"
                      fontSize="14px"
                      lineHeight="20px"
                      color="primary.500"
                    >
                      {title}
                    </Text>
                    <Text ml="5px" fontSize="10px" lineHeight="17px" color="grey.300">
                      {durationLabel} {moment(getDashboardData.bills[0].date).format(
                        "D, MMM YYYY"
                      )}
                    </Text>
                  </Flex>
                  <Flex ml="auto" alignItems="center">
                    <Text
                      fontSize="12px"
                      lineHeight="17px"
                      color="primary.800"
                      mr="10px"
                      ml="auto"
                    >
                      {totalEstimatedLabel}
                    </Text>
                    <Box
                      backgroundColor="secondary.500"
                      borderRadius="7px"
                      px="10px"
                      py="5px"
                    >
                      <Text
                        fontWeight="500"
                        fontSize="20px"
                        lineHeight="22px"
                        letterSpacing="0.15px"
                        color="white"
                      >
                        {GC.currencySymbol}{getDashboardData.bills[0].totalBillAmount}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  mt="26px"
                  pb="20px"
                  borderBottom="1px solid"
                  borderColor="grey.50"
                >
                  <Text {...textStyle} letterSpacing="0.25px">
                    {monthlyChargesLabel}
                  </Text>
                  <Text
                    {...textStyle}
                    ml="auto"
                    fontWeight="bold"
                    letterSpacing="0.1px"
                  >
                    {GC.currencySymbol}{getDashboardData.bills[0].totalBillAmount}
                  </Text>
                </Flex>
                <Flex
                  mt="20px"
                  pb="20px"
                  borderBottom="1px solid"
                  borderColor="grey.50"
                >
                  <Text {...textStyle} letterSpacing="0.25px">
                    {additionalChargesLabel}
                  </Text>
                  <Text
                    {...textStyle}
                    ml="auto"
                    fontWeight="bold"
                    letterSpacing="0.1px"
                  >
                    {GC.currencySymbol}{getDashboardData?.currentBill?.additionalCharges || 0}
                  </Text>
                </Flex>
              </Box>
              {!hideButton && (
                <Text
                  color="secondary.500"
                  fontWeight="bold"
                  fontSize="16px"
                  lineHeight="25px"
                  letterSpacing="0.01em"
                  mt="20px"
                  textTransform="uppercase"
                  cursor="pointer"
                  onClick={() => history.push(buttonLink || "")}
                >
                  {buttonLabel}
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    );
  }
  return <></>;
};

export default NextBill;
