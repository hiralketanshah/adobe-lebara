import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Avatar,
  Wrap,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AvatarBadge,
  Circle,
} from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";
import {
  AiOutlineMessage,
  BiGlobe,
  IoCallOutline,
  IoPaperPlaneOutline,
} from "react-icons/all";
import { useHistory } from "react-router-dom";
import { globalConfigs as GC, globalConstants as C} from "../../GlobalConfigs";
import { UsageDetailsProps, PhoneProps, SMSProps } from "./types";
import Button from "../Button/Button";
import Select from "../Select/Select";

const UsageDetails: React.FC<UsageDetailsProps> = ({
  activityLasts,
  filterUsageOptions,
  phoneCallDetails,
  smsDetails,
  tabsName,
  theme,
  defaultSeeMoreClicked = false,
  isWhiteTabs = false,
  title,
  description,
  ctaSeeMoreCallsLabel,
  ctaLoadMoreLabel,
  ctaSeeMoreURL,
  ctaTopupURL,
  ctaTopupText,
}) => {
  const [lastActivity] = useState(activityLasts);
  const INTERNATIONAL_CALL_TYPE = "international";
  const ROAMING_CALL_TYPE = "roaming";
  const FLIGHT_CALL_TYPE = "flight";
  const MESSAGE_CALL_TYPE = "message";
  const history = useHistory();

  const [isSeeMoreClicked, setSeeMoreClicked] = React.useState<boolean>(
    defaultSeeMoreClicked
  );

  const renderCallingType = (param: string) => {
    switch (param) {
      case INTERNATIONAL_CALL_TYPE:
        return <IoCallOutline size={15} color="white" />;
      case ROAMING_CALL_TYPE:
        return <BiGlobe size={15} color="white" />;
      case FLIGHT_CALL_TYPE:
        return <IoPaperPlaneOutline size={15} color="white" />;
      case MESSAGE_CALL_TYPE:
        return <AiOutlineMessage size={15} color="white" />;
      default:
        return <Text>There is no calling type</Text>;
    }
  };

  const getAvatarColor = (param: string) => {
    switch (param) {
      case INTERNATIONAL_CALL_TYPE:
        return "cyan";
      case ROAMING_CALL_TYPE:
        return "darkTurquoise";
      case FLIGHT_CALL_TYPE:
        return "lebaraGreen";
      case MESSAGE_CALL_TYPE:
        return "cyan";
      default:
        return "white";
    }
  };

  const onSeeMoreClick = () => {
    setSeeMoreClicked(true);
    history.push(ctaSeeMoreURL || GC.journeyPages[C.USAGE_DETAILS]  || '/');
  };

  return (
    <Flex
      px={{ base: "20px", lg: "150px", md: "50px" }}
      py="20px"
      justifyContent="center"
      bg={theme}
    >
      <Box maxW={{ base: "100%", lg: "846px" }}
        position="relative"
        >
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
            {description}
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
                {isSeeMoreClicked ? (
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
                <Wrap>
                  {phoneCallDetails?.map((phoneCallDetail: PhoneProps, idx) => (
                    <Flex
                      borderRadius="lg"
                      p="15px"
                      w="100%"
                      bg="white"
                      alignItems="center"
                      my="7px"
                      key={`pcd-key-${idx}`}
                    >
                      <Avatar
                        name={phoneCallDetail.avatarName}
                        src={phoneCallDetail.avatarSrc}
                        color="white"
                      >
                        <AvatarBadge
                          boxSize="1.25em"
                          bg={getAvatarColor(phoneCallDetail.callingType)}
                          borderColor={getAvatarColor(
                            phoneCallDetail.callingType
                          )}
                        >
                          {renderCallingType(phoneCallDetail.callingType)}
                        </AvatarBadge>
                      </Avatar>
                      <Box ml="10px" textAlign="left">
                        <Text
                          fontWeight="700"
                          fontSize="14px"
                          lineHeight="20px"
                          color="primary.800"
                        >
                          +{phoneCallDetail.phoneCode}
                          {phoneCallDetail.phoneNumber}
                        </Text>
                        <Text
                          fontWeight="400"
                          fontSize="14px"
                          lineHeight="20px"
                          color="grey.200"
                        >
                          {phoneCallDetail.duration}
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
                          {phoneCallDetail.callDate} at{" "}
                          {phoneCallDetail.callTime}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Wrap>
              </TabPanel>
              <TabPanel px={{ base: "initial", md: "4px" }}>
                <Wrap>
                  {smsDetails?.map((smsDetail: SMSProps, idx) => (
                    <Flex
                      borderRadius="lg"
                      px={4}
                      p="12px"
                      w="100%"
                      bg="white"
                      alignItems="center"
                      key={`sd-key-${idx}`}
                    >
                      <Avatar
                        bg="grey.50"
                        icon={
                          <AiOutlineMessage fontSize="1.5rem" color="#1978CD" />
                        }
                      />
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
                </Wrap>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex justifyContent="center" px={{ base: "initial", md: "165px" }}>
          {!isSeeMoreClicked ? (
            <Button
              mt={15}
              textTransform="uppercase"
              isFullWidth
              fontWeight="bold"
              bgColor="primary.500"
              color="white"
              maxW={{ base: "100%", md: "335px" }}
              onClick={onSeeMoreClick}
            >{ctaSeeMoreCallsLabel}</Button>
          ) : (
            <Button
              mt={15}
              textTransform="uppercase"
              isFullWidth
              bg="white"
              variant="outline"
              fontWeight="bold"
              maxW={{ base: "100%", md: "335px" }}
              color="primary.500"
            >{ctaLoadMoreLabel}</Button>
          )}
        </Flex>
        <Box
          position="absolute"
          display={{ lg: "inline-block", base: "none" }}
          right="50px"
          top="450px"
        >
          <Circle
            size="72px"
            bg="secondary.500"
            color="white"
            textAlign="center"
          >
            <Button
              display="flex"
              flexDirection="column"
              bg="secondary.500"
              _hover={{ bg: "secondary.500" }}
              _active={{ bg: "secondary.500", borderColor: "secondary.500" }}
              onClick={() => history.push(ctaTopupURL || GC.journeyPages[C.TOP_UP]  || '/')}
              _focus={{
                outline: "none",
              }}
            >
              <Text textTransform="capitalize" fontSize="17px" color="white">
                {ctaTopupText}
              </Text>
            </Button>
          </Circle>
        </Box>
      </Box>
    </Flex>
  );
};

export default UsageDetails;
