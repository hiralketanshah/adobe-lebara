import React from "react";
import { PdfDialogProps } from "./types";
import {
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import { Document, Page } from "react-pdf";

const Doc = ({ fileName }: any) => (
  <Document file={fileName}>
    <Page pageNumber={1} width={1400} />
  </Document>
);

const PdfDialog: React.FC<PdfDialogProps> = ({ fileName, isOpen, onClose,
  ctaCLoseLabel,
  ctaDowndloadLabel
 }) => (
  <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Flex justifyContent="center">
          <Doc fileName={fileName} />
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Flex gridGap="16px">
          <Button onClick={onClose} variant="outline">
            {ctaCLoseLabel}
          </Button>
          <Link
            href={fileName}
            target="_blank"
            download
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button>{ctaDowndloadLabel}</Button>
          </Link>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default PdfDialog;
