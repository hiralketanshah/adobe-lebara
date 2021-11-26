import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
// import { useSelector } from "react-redux";
// import { ReduxState } from "../../redux/types";
import Link from "../Link/Link";
import { LoginTabsProps } from "./types";
import LoginTab from "./LoginTab";
import GuestTab from "./GuestTab";
import CongratulationsPopUp from "../CongratulationsPopUp/CongratulationsPopUp";
import { globalConfigs as GC, globalConstants as GCST} from "../../GlobalConfigs";

const LoginTabs: React.FC<LoginTabsProps> = ({ isPasswordResetSucessfull, ...loginModuleProps }) => {
  // const cartItems = useSelector((state: ReduxState) => state.cart);
  const [tabIndex, setTabIndex] = useState(1);
  const congratsMessage: string = "Your Password has been Reset Successfully.";

  const handleTabSwitch = (value: any) => {
    setTabIndex(parseInt(value, 10));
  }

  const loginExtraBlock = (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      fontSize="14px"
      lineHeight="20px"
      letterSpacing="0.25px"
      mt="22px"
    >
      <Text
        color="grey.300"
        fontWeight="400"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {" "}
        {loginModuleProps?.extraBlockLoginText}{" "}<Link href={GC?.journeyPages[GCST?.REGISTER]  || '/'}>{loginModuleProps.extraBlockLoginLinkText}</Link>{" "}
      </Text>
    </Flex>
  );
  
  const guestExtraBlock = (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      fontSize="14px"
      lineHeight="20px"
      letterSpacing="0.25px"
      mt="22px"
    >
      <Text
        color="grey.300"
        fontWeight="400"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {" "}
        {loginModuleProps?.extraBlockGuestText}{" "}<Link href={GC?.journeyPages[GCST?.LOGIN]  || '/'}>{loginModuleProps.extraBlockGuestLinkText}</Link>{" "}
        {" "}
      </Text>
    </Flex>
  );

  const tabStyle = {
    fontWeight: "bold",
    fontSize: "22px",
    color: "primary.600",
    letterSpacing: "-1px",
  };
  // if (cartItems.loading) {
  //   return null;
  // }
  return (
    <>
      {isPasswordResetSucessfull ? (
        <CongratulationsPopUp congratulationMessage={congratsMessage} />
      ) : (
        <></>
      )}
      <Tabs index={tabIndex} variant="unstyled" isFitted
        onChange={handleTabSwitch}>
        <TabList>
          <Tab
            bg="grey.50"
            {...tabStyle}
            borderTopLeftRadius="8px"
            _selected={{ bg: "white" }}
            _focus={{ boxShadow: "none" }}
          >
            {loginModuleProps.guestLoginLabel}
          </Tab>
          <Tab
            bg="grey.50"
            {...tabStyle}
            borderTopRightRadius="8px"
            _selected={{ bg: "white" }}
            _focus={{ boxShadow: "none" }}
          >
            {loginModuleProps.loginLabel}
          </Tab>
        </TabList>

        <TabPanels
          background="white"
          borderRadius="0 0 8px 8px"
          px={{ lg: "136px" }}
          pt={{ base: "30px", lg: "78px" }}
          pb={{ base: "32px", lg: "55px" }}
        >
          <TabPanel>
            <GuestTab {...loginModuleProps}/>
            {guestExtraBlock}
          </TabPanel>
          <TabPanel>
            <LoginTab {...loginModuleProps} />
            {loginExtraBlock}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LoginTabs;
