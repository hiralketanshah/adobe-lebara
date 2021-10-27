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
import CheckMark from "./checkOrderedList.png";

const DataModal: React.FC<ModalProps> = ({ open, onClose }) => {
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
  const listStyle = {
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "0.15px",
    color: "primary.800",
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
              Bundle
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="15px">
            <Box>
              <Text {...sectionHeading}>Change bundle</Text>
              <Text {...sectionDetails} mt="5px">
                You can increase or decrease your bundle every month. Without
                extra costs.
              </Text>
            </Box>
            <Box mt="21px">
              <Text {...sectionHeading}>Rates outside the bundle</Text>
              <Flex mt="10px">
                <Image height="19px" width="19px" src={CheckMark} />
                <Flex {...listStyle} ml="10px">
                  <Text fontWeight="bold">200</Text>
                  <Text ml="5px">National mins to Germany</Text>
                </Flex>
              </Flex>
              <Flex mt="10px">
                <Image height="19px" width="19px" src={CheckMark} />
                <Flex {...listStyle} ml="10px">
                  <Text fontWeight="bold">50</Text>
                  <Text ml="5px">Minutes to 50 countries</Text>
                </Flex>
              </Flex>
              <Flex mt="10px">
                <Image height="19px" width="19px" src={CheckMark} />
                <Flex {...listStyle} ml="10px">
                  <Text fontWeight="bold">4G</Text>
                  <Text ml="5px">Included</Text>
                </Flex>
              </Flex>
              <Flex mt="10px">
                <Image height="19px" width="19px" src={CheckMark} />
                <Text {...listStyle} ml="10px">
                  Runs on KPN network
                </Text>
              </Flex>
              <Text {...sectionDetails} mt="18px">
                Do you often call outside your bundle? Then that is possible up
                to a maximum of 10 euros. This way you will never be surprised
                by a high bill. Top up with advantageous outside bundle credit
                so that you can continue to call and text cheaply. Or opt for a
                higher bundle.
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

export default DataModal;
