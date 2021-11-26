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
  Flex,
  Image,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import { ActivateYourSimMobileProps } from "./types";
import EditIcon from "../../assets/images/Edit-Icon.png";

const ActivateYourSimMobile: React.FC<ActivateYourSimMobileProps> = ({
  open,
  mobile,
  onEdit,
  continueClick,
}) => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: open });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minHeight="auto">
        <ModalHeader
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
            <Flex alignItems="center">
              <Text fontSize="14px" lineHeight="22px">
                Mobile number - {mobile}
              </Text>
              <Flex ml="auto" alignItems="center" onClick={onEdit}>
                <Image src={EditIcon} />
                <Text
                  ml="10px"
                  cursor="pointer"
                  fontSize="12px"
                  lineHeight="14px"
                  fontWeight="500"
                  letterSpacing="0.25px"
                  color="secondary.500"
                >
                  EDIT
                </Text>
              </Flex>
            </Flex>

            <Text fontSize="14px" lineHeight="22px" mt="16px">
              We see that your mobile number is not active yet. Kindly proceed
              with your legal registration before attaching it to your account.
            </Text>
            <Text fontSize="14px" lineHeight="22px">
              Click Activate to proceed with legal registration with our third
              party website, this might open a new window
            </Text>
            <Button mt="12px" mb="17px" width="100%" onClick={continueClick}>
              CLICK HERE TO ACTIVATE
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ActivateYourSimMobile;
