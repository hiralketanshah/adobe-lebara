import React from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PlanDetailsDialogProps } from "./types";
import Button from "../Button/Button";
import {globalConfigs} from  '@lebara/ui/src/configs/globalConfigs.js';
const PlanDetailsDialog: React.FC<PlanDetailsDialogProps> = ({
  isOpen,
  onClose,
  planName,
  price,
  duration,
  previewIcon,
  previewItems,
  countries,
  buttonText,
  onActionClick,
  isButtonDisabled,
  title,
  countryTitle,
  dataValue,
  hideButton,
  isLoading
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader pb={0}>
        {planName && (
          <Text color="primary.500" fontWeight="bold" fontSize="14px">
            {planName}
          </Text>
        )}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pt={0}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="h3"
            fontSize={32}
            pr="6px"
            pl="2px"
            fontWeight="bold"
            color="secondary.500"
            fontFamily="Chiswick Grotesque Lebara"
          >
            {dataValue}
          </Text>

          <Flex alignItems="baseline" color="primary.600">
            <Text
              as="h3"
              fontSize={24}
              pr="6px"
              pl="2px"
              color="secondary.500"
              fontWeight={700}
            >
              {price} {globalConfigs.currencySymbol}
            </Text>
            {duration ? <Text as="p" fontSize={14} color="lightenPrimary.150">
              {" "}
              / {duration}
            </Text> : ''}
          </Flex>
        </Flex>

        <Divider my={3.5} />
        {isLoading ? <Center><Spinner /></Center> : ''}
        <Text color="primary.600" fontSize={14} fontWeight="bold" pb="3px">
          {title}
        </Text>
        {previewItems && (
          <Box mt="7px" color="primary.800" fontSize="16px">
            {previewItems.map((t) => (
              <Flex width="100%" alignItems="center" mb={1}>
                {previewIcon}
                <Text ml="8px">{t}</Text>
              </Flex>
            ))}
          </Box>
        )}
        <Text
          color="primary.600"
          fontSize={14}
          fontWeight="bold"
          pt="6px"
          pb="10px"
        >
          {countryTitle}
        </Text>

        <Flex flexDirection="row" overflow="auto" py="8px">
          {countries && countries.map((country, i) => (
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              h="100%"
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  color="bodyCopy"
                  mb="9px"
                  whiteSpace="nowrap"
                  fontSize="12px"
                  letterSpacing="0.25px"
                >
                  {country.countryName}
                  {''}
                </Text>
                <Image src={country.countryFlag} w="45px" h="31.3px" maxW="45px" />
              </Flex>
              {countries && i < countries.length - 1 && (
                <Divider
                  orientation="vertical"
                  h="25px"
                  backgroundColor="#D6D6D6"
                  opacity={1}
                  w="2px"
                  mt="auto"
                  mx="10px"
                />
              )}
            </Flex>
          ))}
        </Flex>
      </ModalBody>
      {!hideButton && (
      <ModalFooter>
        <Button
          onClick={onActionClick}
          isFullWidth
          disabled={isButtonDisabled}
          isLoading={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </ModalFooter>
      )}
    </ModalContent>
  </Modal>
);

export default PlanDetailsDialog;
