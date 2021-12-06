import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Circle,
  Icon,
} from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";
import {
  AiOutlineMessage,
  BiPhoneIncoming,
  BiPhoneOutgoing,
  FiGlobe,
} from "react-icons/all";
import { useHistory } from "react-router-dom";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { UsageDetailsProps, PhoneProps, SMSProps, DataProps } from "./types";
import Button from "../Button/Button";
import Select from "../Select/Select";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import moment from "moment";
import 'moment-duration-format';
import getDynamicValues from "../../utils/get-aem-dynamic-values";
const totalShownByClick = 5;
const UsageDetails: React.FC<UsageDetailsProps> = ({
  activityLasts = 3,
  filterUsageOptions,
  tabsName,
  theme = "grey.50",
  defaultSeeMoreClicked = false,
  isWhiteTabs = false,
  title,
  description,
  ctaSeeMoreCallsLabel,
  ctaLoadMoreLabel,
  ctaSeeMoreURL,
  durationLabel,
}) => {
  const [getDashboardData] = useGetDashboardData();
  const activityHistoryCalls = getDashboardData?.activityHistory?.calls;
  const activityHistorySms = getDashboardData?.activityHistory?.sms;
  const activityHistoryData = getDashboardData?.activityHistory?.data;

  const phoneCallDetails = activityHistoryCalls?.map((t: any) => ({
    amount: t.cost,
    currency: GC.currencySymbol,
    duration: moment.duration(t.seconds, "seconds").format("hh:mm:ss", {
      forceLength: true,
      trim: false,
    }),
    callDate: moment(t.date).fromNow(),
    phoneNumber: t.target,
    callingType: t.type,
  }));
  const smsDetails = activityHistorySms?.map((t: any) => ({
    smsCharges: `${GC.currencySymbol}${t.cost}`,
    smsTime: moment(t.date).fromNow(),
    phoneNumber: t.target,
  }));

  const dataDetails = activityHistoryData?.map((t: any) => ({
    cost: `${GC.currencySymbol}${t.cost}`,
    date: moment(t.date).fromNow(),
    usedData: t.usedData,
  }));
  const [lastActivity] = useState(activityLasts);
  const history = useHistory();
  const [numberOfCallsShown, setNumberOfCallsShown] =
    React.useState(totalShownByClick);
  const [numberOfSmsShown, setNumberOfSmsShown] =
    React.useState(totalShownByClick);
  const [numberOfDataShown, setNumberOfDataShown] =
    React.useState(totalShownByClick);

  const onLoadMorePhoneCallsClick = () => {
    setNumberOfCallsShown(numberOfCallsShown + totalShownByClick);
  };

  const onLoadMorePhoneSMSClick = () => {
    setNumberOfSmsShown(numberOfSmsShown + totalShownByClick);
  };
  const onLoadMorePhoneDataClick = () => {
    setNumberOfDataShown(numberOfDataShown + totalShownByClick);
  };

  const isCallsDisabled =
    numberOfCallsShown >= (phoneCallDetails ? phoneCallDetails.length : 0);
  const isSmsDisabled =
    numberOfSmsShown >= (smsDetails ? smsDetails.length : 0);
  const isDataDisabled =
    numberOfDataShown >= (dataDetails ? dataDetails.length : 0);

    const onSeeMoreClick = () => {
      history.push(ctaSeeMoreURL || GC.journeyPages[C.USAGE_DETAILS]  || '/');
    };

  return (
    <Flex
      px={{ base: "20px", lg: "150px", md: "50px" }}
      py="20px"
      justifyContent="center"
      bg={theme}
    >
      <Box maxW={{ base: "100%", lg: "846px" }} minW={{ lg: "800px" }}>
        <Box display="flex" textAlign="center" flexDirection="column" pb="20px">
          <Text
            fontWeight="bold"
            fontSize="32px"
            fontFamily="Chiswick Grotesque Lebara"
            lineHeight="40px"
            color="primary.800"
          >
            {title}
          </Text>
          <Text fontWeight="400" fontSize="14px" color="primary.800" mt="8px">
          {getDynamicValues(description, [lastActivity])}
          </Text>
        </Box>
        <Box>
          <Tabs
            align="center"
            color="primary.800"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.15px"
            fontWeight="400"
            borderBottom="initial"
            bg={theme}
          >
            <Box px={{ base: "initial", md: "165px" }}>
              <TabList
                borderBottom="initial"
                height="56px"
                bg={isWhiteTabs ? "white" : theme}
                borderRadius="md"
                py="5px"
              >
                {tabsName?.map((tabName: string) => (
                  <Tab
                    _selected={{
                      color: isWhiteTabs ? "#FF3182" : "primary.800",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "23px",
                      borderBottom: "3px solid #FF3182;",
                    }}
                  >
                    {tabName}
                  </Tab>
                ))}
              </TabList>
            </Box>

            <TabPanels>
              <TabPanel px={{ base: "initial", md: "4px" }}>
                {filterUsageOptions ? (
                  <Box mb="10px" borderRadius="lg">
                    <Select
                      options={filterUsageOptions}
                      fontSize="16px"
                      lineHeight="22px"
                      color="primary.800"
                      formControlBorderRadius="lg"
                      fontWeight="normal"
                      placeholder="Filter by all usage"
                    />
                  </Box>
                ) : (
                  <></>
                )}
                <Flex gridGap="8px" flexDirection="column">
                  {phoneCallDetails
                    ?.slice(0, numberOfCallsShown)
                    ?.map((phoneCallDetail: PhoneProps) => (
                      <Flex
                        borderRadius="lg"
                        px={4}
                        p="12px"
                        w="100%"
                        bg="white"
                        alignItems="center"
                      >
                        <Circle p="12px" bg="rgba(0, 166, 235, 0.2)">
                          {phoneCallDetail.callingType === "OUT" && (
                            <Icon
                              as={BiPhoneOutgoing}
                              w="24px"
                              h="24px"
                              color="lightenPrimary.500"
                            />
                          )}
                          {phoneCallDetail.callingType !== "OUT" && (
                            <Icon
                              as={BiPhoneIncoming}
                              w="24px"
                              h="24px"
                              color="lightenPrimary.500"
                            />
                          )}
                        </Circle>
                        <Box ml="10px" textAlign="left">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            +{phoneCallDetail.phoneNumber}
                          </Text>
                          <Text
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="20px"
                            color="grey.200"
                          >
                            {durationLabel} {phoneCallDetail.duration}
                          </Text>
                        </Box>
                        <Box marginLeft="auto" textAlign="right">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            {phoneCallDetail.currency}
                            {phoneCallDetail.amount}
                          </Text>
                          <Text
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="20px"
                            color="grey.200"
                          >
                            {phoneCallDetail.callDate}
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  {defaultSeeMoreClicked ? (
                    <Box width="100%">
                      <Button
                        mt={15}
                        textTransform="uppercase"
                        isFullWidth
                        bg="white"
                        variant="outline"
                        fontWeight="bold"
                        maxW={{ base: "100%", md: "335px" }}
                        color="primary.500"
                        isDisabled={isCallsDisabled}
                        onClick={onLoadMorePhoneCallsClick}
                      >
                        {ctaLoadMoreLabel}
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Flex>
              </TabPanel>
              <TabPanel px={{ base: "initial", md: "4px" }}>
                <Flex gridGap="8px" flexDirection="column">
                  {smsDetails
                    ?.slice(0, numberOfSmsShown)
                    ?.map((smsDetail: SMSProps) => (
                      <Flex
                        borderRadius="lg"
                        px={4}
                        p="12px"
                        w="100%"
                        bg="white"
                        alignItems="center"
                      >
                        <Circle p="12px" bg="rgba(0, 166, 235, 0.2)">
                          <Icon
                            as={AiOutlineMessage}
                            w="24px"
                            h="24px"
                            color="lightenPrimary.500"
                          />
                        </Circle>

                        <Box textAlign="left" ml="10px">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            {smsDetail.phoneNumber}
                          </Text>
                        </Box>
                        <Box textAlign="right" ml="auto">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            {smsDetail.smsCharges}
                          </Text>
                          <Text
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="20px"
                            color="grey.200"
                          >
                            {smsDetail.smsTime}
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  {defaultSeeMoreClicked ? (
                    <Box width="100%">
                      <Button
                        mt={15}
                        textTransform="uppercase"
                        isFullWidth
                        bg="white"
                        variant="outline"
                        fontWeight="bold"
                        maxW={{ base: "100%", md: "335px" }}
                        color="primary.500"
                        isDisabled={isSmsDisabled}
                        onClick={onLoadMorePhoneSMSClick}
                      >
                        {ctaLoadMoreLabel}
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Flex>
              </TabPanel>
              <TabPanel px={{ base: "initial", md: "4px" }}>
                <Flex gridGap="8px" flexDirection="column">
                  {dataDetails
                    ?.slice(0, numberOfDataShown)
                    ?.map((dataDetail: DataProps) => (
                      <Flex
                        borderRadius="lg"
                        px={4}
                        p="12px"
                        w="100%"
                        bg="white"
                        alignItems="center"
                      >
                        <Circle p="12px" bg="rgba(0, 166, 235, 0.2)">
                          <Icon
                            as={FiGlobe}
                            w="24px"
                            h="24px"
                            color="lightenPrimary.500"
                          />
                        </Circle>
                        <Box textAlign="left" ml="10px">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            {dataDetail.usedData}
                          </Text>
                        </Box>
                        <Box textAlign="right" ml="auto">
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            lineHeight="20px"
                            color="primary.800"
                          >
                            {dataDetail.cost}
                          </Text>
                          <Text
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="20px"
                            color="grey.200"
                          >
                            {dataDetail.date}
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  {defaultSeeMoreClicked ? (
                    <Box width="100%">
                      <Button
                        mt={15}
                        textTransform="uppercase"
                        isFullWidth
                        bg="white"
                        variant="outline"
                        fontWeight="bold"
                        maxW={{ base: "100%", md: "335px" }}
                        color="primary.500"
                        isDisabled={isDataDisabled}
                        onClick={onLoadMorePhoneDataClick}
                      >
                        {ctaLoadMoreLabel}
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex justifyContent="center" px={{ base: "initial", md: "165px" }}>
          {!defaultSeeMoreClicked ? (
            <Button
              mt={15}
              textTransform="uppercase"
              isFullWidth
              fontWeight="bold"
              bgColor="primary.500"
              color="white"
              maxW={{ base: "100%", md: "335px" }}
              onClick={onSeeMoreClick}
            >
              {ctaSeeMoreCallsLabel}
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default UsageDetails;
