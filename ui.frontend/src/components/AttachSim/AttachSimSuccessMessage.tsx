import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import CheckCircle from "../../assets/images/checkCircle.png";

const AttachSimSuccessMessage: React.FC = () => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: false });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="8px"
        minHeight="auto"
        maxWidth={{ base: "100%", md: "400px" }}
      >
        <ModalCloseButton color="white" size="14px" pt="17px" pr="17px" />
        <ModalBody bgColor="primary.800" borderRadius="8px">
          <Flex
            pt="34px"
            pb="66px"
            px="34px"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Image src={CheckCircle} />
            <Text
              mt="17px"
              fontSize="16px"
              lineHeight="19px"
              fontWeight="bold"
              color="white"
            >
              Congratulations!
            </Text>
            <Text
              mt="8px"
              fontSize="14px"
              lineHeight="16px"
              color="white"
              fontWeight="500"
              textAlign="center"
            >
              Your Sim number has successfully linked to your email address.
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttachSimSuccessMessage;
