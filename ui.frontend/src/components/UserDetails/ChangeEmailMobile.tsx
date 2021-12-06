import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { ChangeEmailMobileProps } from "./types";
import Button from "../Button/Button";

const ChangeEmailMobile: React.FC<ChangeEmailMobileProps> = ({
  isOpen,
  onClose,
  mobile,
  onPinSend,
}) => {
  const sendPinContinueClick = () => {
    onPinSend();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="8px" minHeight="auto">
        <ModalBody
          py={{ base: "42px", lg: "47px" }}
          px={{ base: "18px", lg: "74px" }}
          w="auto"
          bgColor="white"
          borderRadius="8px"
        >
          <Flex flexDirection="column">
            <Text
              fontWeight="500"
              fontSize="20px"
              lineHeight="22px"
              letterSpacing="0.15px"
            >
              Change Email Address
            </Text>
            <Text fontSize="14px" lineHeight="16px" mt="16px">
              Verification Code will be sent to the provided mobile number.
            </Text>
            <Text fontWeight="500" fontSize="16px" lineHeight="22px" mt="16px">
              Mobile Number
            </Text>
            <Text
              mt="6px"
              border="0.7px solid #C8C8C8"
              borderRadius="12px"
              w={{ base: "100%", lg: "394px" }}
              py="14px"
              px="24px"
            >
              {mobile}
            </Text>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Button
                w={{ base: "100%", lg: "324px" }}
                mt={{ base: "40px", lg: "45px" }}
                onClick={sendPinContinueClick}
              >
                Continue
              </Button>
              <Button
                w={{ base: "100%", lg: "324px" }}
                mt="15px"
                variant="outline"
              >
                cancel
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEmailMobile;
