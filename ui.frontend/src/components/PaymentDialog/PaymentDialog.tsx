import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PaymentDialogProps } from "./types";
import PaymentFrame from "./PaymentFrame";

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose }) => (
  <Modal
    blockScrollOnMount={false}
    isOpen={isOpen}
    onClose={onClose}
    size="5xl"
    closeOnOverlayClick={false}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader color="primary.500" fontSize="20px">
        Select payment method
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <PaymentFrame />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default PaymentDialog;
