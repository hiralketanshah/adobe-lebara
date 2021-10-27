import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Flex,
} from "@chakra-ui/react";
import { ModalProps } from "./types";
import Button from "../Button/Button";

const DurationModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const sectionHeading = {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "22px",
    color: "primary.500",
    letterSpacing: "0.5px",
  };
  const sectionDetails = {
    fontSize: "14px",
    lineHeight: "20px",
    color: "primary.800",
    letterSpacing: "0.25px",
  };
  return (
    <Box px="15px">
      <Modal isOpen={open} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={{ base: "calc(100% - 30px)", md: "500px" }}>
          <ModalHeader>
            <Text
              fontWeight="bold"
              fontSize="20px"
              lineHeight="40px"
              color="primary.500"
              letterSpacing="-0.01em"
            >
              Duration
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="15px">
            <Box>
              <Text {...sectionHeading}>24 months</Text>
              <Text {...sectionDetails} mt="5px">
                Your subscription starts from the moment you activate the SIM
                card. After 24 months, your subscription is automatically
                converted to a monthly subscription that can be canceled.
              </Text>
            </Box>
            <Box mt="21px">
              <Text {...sectionHeading}>Monthly cancelable subscription</Text>
              <Text {...sectionDetails} mt="5px">
                With a monthly terminable subscription you remain nice and
                flexible. The subscription is renewed every month with a notice
                period of 1 month. You pay €1 extra. Save money? Convert your
                subscription to a 2-year subscription for free.
              </Text>
            </Box>
            <Box mt="21px">
              <Text {...sectionHeading}>Starting date</Text>
              <Text {...sectionDetails} mt="5px">
                You activate the subscription whenever you want. Requested
                number porting? Then only activate your subscription on the day
                your number is transferred.
              </Text>
            </Box>
            <Flex justifyContent="center">
              <Button
                mt="35px"
                width={{ base: "100%", md: "320px" }}
                variant="outline"
                onClick={() => onClose(false)}
              >
                Close
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DurationModal;
