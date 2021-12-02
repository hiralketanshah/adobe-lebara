import React from "react";
import {
  Flex,
  Box,
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

const DelinkSuccessMessage: React.FC = () => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        color="white"
        borderRadius="8px"
        minHeight="auto"
        p="0px"
        maxWidth={{ base: "100%", md: "400px" }}
      >
        <ModalCloseButton color="white" size="14px" pt="24px" pr="24px" />
        <ModalBody bgColor="primary.800">
          <Flex pt="34px" pb="25px" alignItems="center" flexDirection="column">
            <Image src={CheckCircle} />
            <Text
              mt="17px"
              fontSize="16px"
              lineHeight="22px"
              letterSpacing="0.5px"
              color="white"
              textAlign="center"
            >
              You have successfully Delinked 071234567890 from your account
            </Text>
            <Box
              mt="17px"
              fontSize="16px"
              lineHeight="22px"
              letterSpacing="0.5px"
              color="white"
              textAlign="center"
            >
              <Text as="span">{`Would you like to buy a `}</Text>
              <Text textDecoration="underline" as="span">
                Free Sim
              </Text>
              <Text as="span">{` ?`}</Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DelinkSuccessMessage;
