import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import AttachSimProps from "./types";

const ActivateYourSim: React.FC<AttachSimProps> = ({ open, continueClick }) => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: open });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minHeight="auto">
        <ModalHeader
          fontFamily="Roboto"
          fontWeight="bold"
          fontSize="18px"
          lineHeight="22px"
          paddingTop="20px"
          paddingLeft="32px"
          paddingBottom="13px"
        >
          Activate your SIM
        </ModalHeader>
        <ModalBody paddingLeft="32px" paddingTop="0px" paddingBottom="25px">
          <Box>
            <Text fontSize="14px" lineHeight="22px" fontFamily="Roboto">
              We see that your mobile number is not active yet.
            </Text>
            <Text fontSize="14px" lineHeight="22px" fontFamily="Roboto">
              Kindly insert your sim card in your mobile to activate your card.
            </Text>
            <Text
              color="secondary.500"
              textDecoration="underline"
              fontFamily="Roboto"
              fontSize="14px"
              lineHeight="16px"
              textAlign="center"
              cursor="pointer"
              mt="25px"
              onClick={continueClick}
            >
              Continue Browsing
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ActivateYourSim;
