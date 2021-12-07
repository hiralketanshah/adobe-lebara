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
import "./style.css";
import Button from "../Button/Button";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = '/etc.clientlibs/lebara/clientlibs/clientlib-react/resources/pdf.worker.js';

const Doc = ({ fileName }: any) => (
  <Document file={fileName}>
    <Page pageNumber={1} width={1400} />
  </Document>
);

const PdfDialog: React.FC<PdfDialogProps> = ({ fileName, isOpen, onClose,
  ctaCloseLabel,
  ctaDownloadLabel
 }) => (
  <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
    <ModalCloseButton zIndex={1000} />
      <ModalBody>
        <Flex justifyContent="center">
          <Doc fileName={fileName} />
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Flex
          gridGap={{ base: "10px", lg: "20px" }}
          flexDirection="column"
          w="100%"
          alignItems="center"
        >
          <Link
            w="100%"
            maxW={{ lg: "408px" }}
            href={fileName}
            target="_blank"
            download
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button isFullWidth>{ctaDownloadLabel}</Button>
          </Link>
          <Button
            onClick={onClose}
            variant="outline"
            isFullWidth
            maxW={{ lg: "408px" }}
          >
           {ctaCloseLabel}
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default PdfDialog;
