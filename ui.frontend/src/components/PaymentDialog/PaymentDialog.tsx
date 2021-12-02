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

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose, paymentMethodLabel = "Select payment method", isPostpaid }) => (
  <Modal
    blockScrollOnMount={false}
    isOpen={isOpen}
    onClose={onClose}
    size="2xl"
    closeOnOverlayClick={false}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader color="primary.500" fontSize="20px">
        {paymentMethodLabel}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <PaymentFrame isPostpaid={!!isPostpaid}/>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default PaymentDialog;
