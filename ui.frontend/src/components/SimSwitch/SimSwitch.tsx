import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import SimSwitchIcon from "../../assets/images/simSwitch.png";
import { SimSwitchProps } from "./types";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import { globalConfigs } from "../../GlobalConfigs";

const SimSwitch: React.FC<SimSwitchProps> = ({
  simName,
  balanceLabel
}) => {
  const [getDashboardData,msisdn] = useGetDashboardData();
  const { mainBalance = "" } = getDashboardData || "";
  const isPostPaid = !!(getDashboardData && getDashboardData.bills);
  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        w={{ base: "100%", lg: "846px" }}
        flexDirection="column"
        px={{ base: "20px", lg: 0 }}
        gridGap={{ base: "17px", lg: "20px" }}
        pt={{ base: "17px", lg: "20px" }}
      >
        <Flex
          py="12px"
          px="22px"
          width="100%"
          borderRadius={{ base: "md", lg: "lg" }}
          bgColor="white"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Box width="15px" height="22px">
              <img src={SimSwitchIcon} alt="Sim Switch" />
            </Box>
            <Box ml="18px">
              <Text
                fontSize="12px"
                lineHeight="17px"
                letterSpacing="0.23px"
                color="primary.800"
              >
                {simName}
              </Text>
              <Text
                fontSize="16px"
                lineHeight="25px"
                fontWeight="bold"
                letterSpacing="0.01em"
                color="primary.800"
              >
                {msisdn}
              </Text>
            </Box>
          </Box>

          {mainBalance && (
            <Box
              py="7px"
              px="14px"
              backgroundColor="darkTurquoise"
              borderRadius="10px"
              ml="25px"
              maxH="25px"
            >
              <Text
                fontSize="12px"
                lineHeight="14px"
                letterSpacing="0.25px"
                fontWeight="bold"
                color="white"
              >
                {balanceLabel} {globalConfigs.currencySymbol}{isPostPaid ? undefined : mainBalance[0].currentAmount}
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SimSwitch;
