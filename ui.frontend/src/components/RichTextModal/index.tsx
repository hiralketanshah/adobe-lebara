import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Flex,
  Image
} from "@chakra-ui/react";
import { ModalProps } from "./types";
import Button from "../Button/Button";
import FromToIcon from "../../assets/images/nextArrowIcon.png";

const RichTextModal: React.FC<ModalProps> = ({ open, onClose, heading, info, closeLabel, countryFlagFrom, countryFlagTo, additionalInfo }) => {
  const sectionDetails = {
    fontSize: "14px",
    lineHeight: "20px",
    color: "primary.800",
    letterSpacing: "0.25px",
  };
  return (
    <Box px="15px">
      <Modal isOpen={open} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={{ base: "calc(100% - 30px)", md: "500px" }}>
          <ModalHeader>
            <Text
              fontWeight="bold"
              fontSize="20px"
              lineHeight="40px"
              color="primary.500"
              letterSpacing="-0.01em"
            >
              {heading}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="15px" className={'rich-text'}>
            {info && <div style={{...sectionDetails}} dangerouslySetInnerHTML={{ __html: info || '' }} />}
            
            {countryFlagFrom && (
              <Box width="292px" mr="20px" className={`rich-text-flags-wrap`}>
                <Flex alignItems="center">
                  <Image height="24px" width="24px" src={countryFlagFrom} />
                  <Image mx="19px" height="17px" width="9px" src={FromToIcon} />
                  <Image height="24px" width="24px" src={countryFlagTo} />
                </Flex>
              </Box>
            )}

            {additionalInfo && (<div  style={{...sectionDetails}} dangerouslySetInnerHTML={{ __html: additionalInfo || '' }} />)}

            <Flex justifyContent="center">
              <Button
                mt="35px"
                width={{ base: "100%", md: "320px" }}
                variant="outline"
                onClick={() => onClose(false)}
              >
                {closeLabel}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RichTextModal;
