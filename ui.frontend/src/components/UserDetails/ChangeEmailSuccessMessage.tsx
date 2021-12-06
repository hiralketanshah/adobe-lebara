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
  successModal,
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
          {successModal?.heading && <Text
            mt={{ base: "39px", lg: "28px" }}
            fontSize="20px"
            lineHeight="22px"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            {successModal?.heading}
          </Text>}

          {successModal?.beforeEmailText && successModal?.afterEmailText &&<Text
            mt={{ base: "24px", lg: "14px" }}
            fontSize="14px"
            lineHeight="16px"
            color="white"
            fontWeight="500"
            textAlign="center"
          >
            {successModal?.beforeEmailText} {email} {
              successModal?.afterEmailText}
          </Text>}

          {successModal?.description && <Flex>
            <Text
              mt={{ base: "24px", lg: "14px" }}
              fontSize="14px"
              lineHeight="18px"
              color="white"
              fontWeight="500"
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: successModal?.description }}
            />
          </Flex>}
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ChangeEmailSuccess;
