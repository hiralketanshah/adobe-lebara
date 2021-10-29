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
import { ReduxState } from "../../redux/types";
import { useSelector } from "react-redux";
import { LoginTabsProps } from "./types";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";
import Link from "../Link/Link";

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
  
  const extraBlock = (
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
        Already have Lebara Account? <Link href="/" onClick={(e) => {
          e.preventDefault();
          handleTabSwitch("0");
        }}>Login</Link>{" "}
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
          {loginModuleProps.loginLabel}
        </Tab>
        <Tab
          bg="grey.50"
          {...tabStyle}
          borderTopRightRadius="8px"
          _selected={{ bg: "white" }}
          _focus={{ boxShadow: "none" }}
        >
          {loginModuleProps.registrationCtaLabel}
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
          {extraBlock}
        </TabPanel>
        <TabPanel>
          <RegisterTab {...loginModuleProps} />
          {extraBlock}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RegisterTabs;
