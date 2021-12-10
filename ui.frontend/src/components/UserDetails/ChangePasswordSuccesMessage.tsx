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
import { ChangePasswordSuccessProps } from "./types";

const ChangePasswordSuccess: React.FC<ChangePasswordSuccessProps> = ({ 
  isOpen, 
  onClose, 
  changePasswordSuccessMsg = "Password Successfuly Updated",
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
            mt="8px"
            fontSize="14px"
            lineHeight="16px"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            {changePasswordSuccessMsg}
          </Text>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ChangePasswordSuccess;
