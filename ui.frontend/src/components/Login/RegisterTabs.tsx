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
import { LoginTabsProps } from "./types";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";
import Link from "../Link/Link";
import { globalConfigs as GC, globalConstants as GCST} from "../../GlobalConfigs";

const RegisterTabs: React.FC<LoginTabsProps> = ({ ...loginModuleProps }) => {
  // const cartItems = useSelector((state: ReduxState) => state.cart);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSwitch = (value: any) => {
    setTabIndex(parseInt(value, 10));
  }

  const tabStyle = {
    fontWeight: "bold",
    fontSize: "22px",
    color: "primary.600",
    letterSpacing: "-1px",
  };
  
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
        {loginModuleProps?.extraBlockLoginText} <Link href="/" onClick={(e) => {
          e.preventDefault();
          handleTabSwitch("1");
        }}>{loginModuleProps?.extraBlockLoginLinkText}</Link>{" "}
      </Text>
    </Flex>
  );
  
  const registerExtraBlock = (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      fontSize="14px"
      lineHeight="20px"
      letterSpacing="0.25px"
      mt="22px"
    >
      <Text d="inline">
        {" "}
        {loginModuleProps?.extraBlockRegisterText}
        <Link
            d="inline"
            href={(GC.journeyPages[GCST.LOGIN] || '/')}
        >
        {loginModuleProps?.extraBlockRegisterLinkText}
        </Link>{" "}
      </Text>
    </Flex>
  );

  // if (cartItems.loading) {
  //   return null;
  // }

  return (
    <Tabs index={tabIndex} variant="unstyled" isFitted defaultIndex={0}
      onChange={handleTabSwitch}>
      <TabList>
        <Tab
          bg="grey.50"
          {...tabStyle}
          borderTopLeftRadius="8px"
          _selected={{ bg: "white" }}
          _focus={{ boxShadow: "none" }}
        >
          {loginModuleProps.loginTabLabel}
        </Tab>
        <Tab
          bg="grey.50"
          {...tabStyle}
          borderTopRightRadius="8px"
          _selected={{ bg: "white" }}
          _focus={{ boxShadow: "none" }}
        >
          {loginModuleProps.registrationTabLabel}
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
          <LoginTab {...loginModuleProps} />
          {loginExtraBlock}
        </TabPanel>
        <TabPanel>
          <RegisterTab {...loginModuleProps} />
          {registerExtraBlock}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RegisterTabs;
