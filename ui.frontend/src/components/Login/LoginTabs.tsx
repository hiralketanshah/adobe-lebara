import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaFacebookF, FcGoogle } from "react-icons/all";
import { useSelector } from "react-redux";
import Link from "../Link/Link";
import IconButton from "../IconButton/IconButton";
import { LoginTabsProps } from "./types";
import LoginTab from "./LoginTab";
import Button from "../Button/Button";
import GuestTab from "./GuestTab";
import { ReduxState } from "../../redux/types";
import CongratulationsPopUp from "../CongratulationsPopUp/CongratulationsPopUp";

const LoginTabs: React.FC<LoginTabsProps> = ({ isPasswordResetSucessfull, ...loginModuleProps }) => {
  const cartItems = useSelector((state: ReduxState) => state.cart);
  const congratsMessage: string = "Your Password has been Reset Successfully.";
  const registerBlock = (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      fontSize={14}
      fontWeight="400"
    >
      <Text my="12px" color="bodyCopy " fontSize="14px" lineHeight="20px">
        OR
      </Text>

      <Flex
        justifyContent="center"
        flexDirection="column"
        gridGap="11px"
        w="100%"
      >
        <Button
          isFullWidth
          textTransform="none"
          borderColor="primary.500"
          leftIcon={
            <IconButton
              my="8px"
              aria-label="Google"
              icon={<FcGoogle />}
              backgroundColor="grey.50"
              isRound
            />
          }
          variant="outline"
          fontSize={14}
          fontWeight="400"
          letterSpacing="0.25px"
          color="black"
        >
          <Text minW="200px">Continue with Google</Text>
        </Button>
        <Button
          isFullWidth
          textTransform="none"
          borderColor="primary.500"
          leftIcon={
            <IconButton
              my="8px"
              aria-label="Google"
              icon={<FaFacebookF />}
              backgroundColor="grey.50"
              isRound
            />
          }
          variant="outline"
          fontSize={14}
          letterSpacing="0.25px"
          fontWeight="400"
          color="black"
        >
          <Text minW="200px">Continue with Facebook</Text>
        </Button>
      </Flex>
      <Text
        mt="32px"
        color="grey.300"
        fontWeight="400"
        lineHeight="20px"
        letterSpacing="0.25px"
      >
        {" "}
        New to Lebara? <Link href="/">Register</Link>{" "}
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
      <Tabs variant="unstyled" isFitted defaultIndex={1}>
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
            {registerBlock}
          </TabPanel>
          <TabPanel>
            <LoginTab {...loginModuleProps} />
            {registerBlock}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LoginTabs;
