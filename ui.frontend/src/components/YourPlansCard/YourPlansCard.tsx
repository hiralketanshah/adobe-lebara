import React from "react";
import { IoInformationCircleOutline } from "react-icons/all";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { ProgressBarCardDataProps, YourPlansCardProps } from "./types";
import { ProgressBarCardProps } from "../ProgressBarCard/types";
import ProgressBarCard from "../ProgressBarCard/ProgressBarCard";
import Button from "../Button/Button";

const YourPlansCard: React.FC<YourPlansCardProps> = ({
  buttonText,
  planName,
  plans,
  fullWidth,
  msisdn,
  title,
  manageLabel,
  leftOfText,
  plansTabNames,
  ctaDashboardManageURL,
}) => {
  const history = useHistory();
  return (
    <Flex
      flexDirection="column"
      background="white"
      borderRadius="lg"
      color="primary.600"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      p="15px"
      width={{ base: fullWidth ? "100%" : "100%", md: "100%" }}
    >
      <Box display="flex">
        <Text fontWeight="700" fontSize="14px" lineHeight="20px">
          {planName}
        </Text>
        &nbsp;
        <IoInformationCircleOutline size={18} color="secondary.500" />
      </Box>
      <Box mt="15px">
        {plans && plans.length !== 0 && (<Tabs
          color="primary.800"
          fontSize="14px"
          lineHeight="22px"
          letterSpacing="0.25px"
          fontWeight="400"
        >
          <TabList
            borderBottom="none"
            overflowX={{ base: "auto", lg: "hidden" }}
            overflowY="hidden"
            py={{ base: "2px" }}
            height={{ base: "40px" }}
          >
            {plans.map((plan: ProgressBarCardDataProps, pIdx) => (
              <Tab
                whiteSpace="nowrap"
                _selected={{
                  backgroundColor: "wispPink",
                  color: "secondary.500",
                  fontWeight: "700",
                  borderRadius: "3px",
                }}
                key={`tab-key-${pIdx}`}
              >
                {plan.planTabName}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {plans.map((plan: ProgressBarCardProps, pIdx) => (
              <TabPanel p="initial" key={`tabpanel-key-${pIdx}`}>
                <ProgressBarCard {...plan}
                    leftOfText={leftOfText}
                    buttonText={manageLabel}
                   />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>)}
      </Box>
      <Box>
        <Button
          variant="ghost"
          fontWeight="700"
          fontSize="16px"
          color="secondary.500"
          lineHeight="25px"
          textTransform="uppercase"
          pl="15px"
          onClick={() =>
            history.push(ctaDashboardManageURL || GC.journeyPages[C.DASHBOARD_MANAGE]  || '/', {
              msisdn,
            })
          }
        >{buttonText}</Button>
      </Box>
    </Flex>
  );
};

export default YourPlansCard;
