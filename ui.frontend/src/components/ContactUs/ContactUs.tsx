import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Button from "../Button/Button";
import ChatIcon from "../../assets/images/support_chat.png";
import CallIcon from "../../assets/images/support_callus.png";
import EmailIcon from "../../assets/images/support_email.png";
import { ContactUsProps } from "./types";

const ContactUs: React.FC<ContactUsProps> = ({}) => {
  const headingStyle = {
    fontFamily: "Roboto",
    fontWeight: { base: "500", lg: "bold" },
    fontSize: { base: "24px", lg: "32px" },
    lineHeight: { base: "30px", lg: "40px" },
    letterSpacing: "0.25px",
    color: "primary.500",
  };
  const boxStyle = {
    bgColor: "grey.50",
    paddingTop: { base: "31px", lg: "40px" },
    paddingLeft: { base: "22px", lg: "23px" },
    paddingRight: { base: "21px", lg: "23px" },
    width: { base: "100%" },
    borderRadius: "4px",
  };
  const contactBoxTextStyle = {
    fontFamily: "Roboto",
    fontSize: { base: "14px", lg: "16px" },
    lineHeight: { base: "20px", lg: "23px" },
    color: "#00000",
  };
  return (
    <Box
      py={{ base: "30px", lg: "60px" }}
      paddingLeft={{ base: "20px", lg: "81px" }}
      paddingRight="20px"
    >
      <Text
        fontFamily="Chiswick Grotesque Lebara"
        fontWeight="bold"
        fontSize="32px"
        lineHeight="40px"
        letterSpacing="0.25px"
        color="primary.500"
      >
        Ask us for support
      </Text>
      <Text
        fontFamily="Roboto"
        fontSize={{ base: "14px", lg: "16px" }}
        lineHeight={{ base: "20px", lg: "23px" }}
        mt="10px"
      >
        Our team is here to help you 7 days a week.
      </Text>
      <Flex
        mt={{ base: "10px", lg: "50px" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box {...boxStyle} mt="10px">
          <Flex alignItems="center">
            <Text {...headingStyle}>Live Chat</Text>
            <img src={ChatIcon} alt="chat" style={{ marginLeft: "auto" }} />
          </Flex>
          <Text {...contactBoxTextStyle} mt={{ base: "9px", lg: "9px" }}>
            Chat to our friendly advisors.
          </Text>
          <Text {...contactBoxTextStyle} mt={{ base: "3px", lg: "13px" }}>
            We are online everyday from 9am to 9pm.
          </Text>
          <Button
            w="100%"
            mt={{ base: "20px", lg: "60px" }}
            mb={{ base: "30px", lg: "40px" }}
          >
            START LIVE CHAT
          </Button>
        </Box>
        <Box {...boxStyle} ml={{ lg: "21px" }} mt="10px">
          <Flex alignItems="center">
            <Text {...headingStyle}>Call Support</Text>
            <img src={CallIcon} alt="chat" style={{ marginLeft: "auto" }} />
          </Flex>
          <Text {...contactBoxTextStyle} mt={{ base: "9px", lg: "9px" }}>
            We are here to help from 9am to 9pm, all seven days.
          </Text>
          <Flex mt="10px">
            <Text
              color="primary.800"
              fontSize={{ base: "14px", lg: "16px" }}
              lineHeight={{ base: "16px", lg: "22px" }}
              letterSpacing="0.5px"
            >
              Lebara Sim
            </Text>
            <Text
              color="secondary.500"
              fontSize={{ base: "14px", lg: "16px" }}
              lineHeight={{ base: "16px", lg: "22px" }}
              letterSpacing="0.5px"
              ml="15px"
            >
              2323 (Free Call)
            </Text>
          </Flex>
          <Flex mt="10px">
            <Text
              color="primary.800"
              fontSize={{ base: "14px", lg: "16px" }}
              lineHeight={{ base: "16px", lg: "22px" }}
              letterSpacing="0.5px"
            >
              Other User
            </Text>
            <Text
              color="secondary.500"
              fontSize={{ base: "14px", lg: "16px" }}
              lineHeight={{ base: "16px", lg: "22px" }}
              letterSpacing="0.5px"
              ml="15px"
            >
              +331 72 28 23 23
            </Text>
          </Flex>
          <Button
            w="100%"
            mt={{ base: "20px", lg: "25px" }}
            mb={{ base: "30px", lg: "40px" }}
          >
            Ask us a call back
          </Button>
        </Box>
        <Box {...boxStyle} mt="10px" ml={{ lg: "21px" }}>
          <Flex alignItems="center">
            <Text {...headingStyle}>Email</Text>
            <img src={EmailIcon} alt="chat" style={{ marginLeft: "auto" }} />
          </Flex>
          <Text {...contactBoxTextStyle} mt={{ base: "9px", lg: "14px" }}>
            We are here to help from 9am to 9pm, all seven days.
          </Text>
          <Text {...contactBoxTextStyle} mt={{ base: "3px", lg: "13px" }}>
            Let us know what your issue is through mail and we will reach you
            back.
          </Text>
          <Button
            w="100%"
            mt={{ base: "20px", lg: "25px" }}
            mb={{ base: "30px", lg: "40px" }}
          >
            E-MAIL US
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactUs;
