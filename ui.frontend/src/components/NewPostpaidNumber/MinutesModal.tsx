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
  Image,
} from "@chakra-ui/react";
import { ModalProps } from "./types";
import Button from "../Button/Button";
import BelgiunIcon from "./belgium.png";
import AndorraIcon from "./andorra.png";
import FromToIcon from "./nextArrowIcon.png";

const MinutesModal: React.FC<ModalProps> = ({ open, onClose }) => {
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
              Calling & Texting
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="15px">
            <Box>
              <Text {...sectionDetails} mt="10px">
                You get 150 calling minutes and 150 text messages per month as
                standard. For only 1 euro extra per month you can call and text
                unlimited.
              </Text>
            </Box>
            <Box mt="20px">
              <Box width="292px" mr="20px">
                <Flex alignItems="center">
                  <Image height="24px" width="24px" src={AndorraIcon} />
                  <Image mx="19px" height="17px" width="9px" src={FromToIcon} />
                  <Image height="24px" width="24px" src={BelgiunIcon} />
                </Flex>
                <Text {...sectionDetails} mt="12px">
                  Are you calling within the Netherlands with a Dutch number
                  (+31) to another Dutch number (+31)? Then you simply call from
                  your bundle.
                </Text>
              </Box>
            </Box>
            <Box mt="21px">
              <Text {...sectionHeading}>Fair Use Policy</Text>
              <Text {...sectionDetails} mt="12px">
                A Fair Use Policy applies to unlimited calls and texts. Read it
                here.
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

export default MinutesModal;
