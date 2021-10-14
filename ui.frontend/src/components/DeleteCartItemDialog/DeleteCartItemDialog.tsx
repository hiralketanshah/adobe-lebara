import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { DeleteCartItemDialogProps } from "./types";
import Button from "../Button/Button";

const DeleteCartItemDialog: React.FC<DeleteCartItemDialogProps> = ({
  isOpen,
  product,
  type,
  onClose,
  onConfirmDelete,
  deleteCartItemYesButtonLabel,
  deleteCartItemNoButtonLabel,
  deleteCartItemTitle,
  deleteCartItemDesc,
  topUpCreditLabel
}) => (
  <Modal
    blockScrollOnMount={false}
    isOpen={isOpen}
    onClose={onClose}
    isCentered
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{deleteCartItemTitle?.replace('{0}', type || '')}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
        {deleteCartItemDesc?.replace('{0}', (topUpCreditLabel && product?.includes("Top-up") ? topUpCreditLabel : (product || '')))}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="ghost"
          colorScheme="secondary"
          mr={3}
          onClick={onClose}
        >
          {deleteCartItemNoButtonLabel}
        </Button>
        <Button
          variant="ghost"
          colorScheme="secondary"
          onClick={onConfirmDelete}
        >
          {deleteCartItemYesButtonLabel}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteCartItemDialog;
