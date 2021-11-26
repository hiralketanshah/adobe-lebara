import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
} from "@chakra-ui/react";
import CheckCircle from "../../assets/images/checkCircle.png";
import { ChangeEmailSuccessProps } from "./types";

const ChangeEmailSuccess: React.FC<ChangeEmailSuccessProps> = ({
  isOpen,
  onClose,
  email,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent
      borderRadius="8px"
      minHeight="auto"
      maxHeight={{ base: "auto", lg: "169px" }}
      maxWidth={{ base: "100%", lg: "846px" }}
      ml="-15px"
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
            mt={{ base: "39px", lg: "28px" }}
            fontSize="20px"
            lineHeight="22px"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            Email Update Request has been successfully sent !
          </Text>
          <Text
            mt={{ base: "24px", lg: "14px" }}
            fontSize="14px"
            lineHeight="16px"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            Kindy click on the link sent to {email} to validate your email.
          </Text>
          <Flex>
            <Text
              mt={{ base: "24px", lg: "14px" }}
              fontSize="14px"
              lineHeight="18px"
              color="white"
              fontWeight="500"
              textAlign="center"
            >
              Email on My Profile won’t be updated until the verification is
              made.
            </Text>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ChangeEmailSuccess;
