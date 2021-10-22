import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CongratulationsProps } from "./types";

const CongratulationsPopUp: React.FC<CongratulationsProps> = ({
  congratulationMessage,
}) => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <Box p={{ base: "20px", md: "initial" }}>
        <ModalContent
          backgroundColor="primary.800"
          borderRadius="md"
          alignItems="center"
          mx={{ base: "10px", md: "initial" }}
        >
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box
              p="35px"
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              height={{ base: "270px", lg: "352px" }}
            >
              <IoCheckmarkCircleOutline color="white" fontSize="30px" />
              <Box
                color="white"
                alignContent="center"
                textAlign="center"
                mt="25px"
              >
                <Text fontWeight="bold" fontSize="16px" lineHeight="19px">
                  Congratulations !
                </Text>
                <Text
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="16px"
                  mt="8px"
                >
                  {congratulationMessage}
                </Text>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Box>
    </Modal>
  );
};

export default CongratulationsPopUp;
