import React, { useState } from "react";
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
import Button from "../Button/Button";
import Input from "../Input/Input";
import AttachSimProps from "./types";

const AttachSimPopup: React.FC<AttachSimProps> = ({ open, continueClick }) => {
  // STATES
  const { isOpen, onClose } = useDisclosure({ isOpen: open });
  const [simAttached, setSimAttached] = useState("");
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
          Attach your SIM
        </ModalHeader>
        <ModalBody paddingLeft="32px" paddingTop="0px" paddingBottom="25px">
          <Box>
            <Text fontSize="14px" lineHeight="22px" fontFamily="Roboto">
              There is no Sim attached to your account yet.
            </Text>
            <Text fontSize="14px" lineHeight="22px" fontFamily="Roboto">
              Kindly key in your mobile number below to link your sim
            </Text>
            <Text
              mt="13px"
              fontSize="16px"
              lineHeight="22px"
              fontFamily="Roboto"
              fontWeight="bold"
            >
              Lebara Mobile Number
            </Text>
            <Input
              mt="9px"
              placeholder="000000000"
              isRequired
              onChange={(e) => setSimAttached(e.target.value)}
            />
            <Button
              mt="21px"
              mb="25px"
              width="100%"
              isDisabled={simAttached.length !== 10}
              onClick={continueClick}
            >
              continue
            </Button>
            <Text
              color="secondary.500"
              textDecoration="underline"
              fontFamily="Roboto"
              fontSize="14px"
              lineHeight="16px"
              textAlign="center"
              cursor="pointer"
            >
              Continue Browsing
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttachSimPopup;
