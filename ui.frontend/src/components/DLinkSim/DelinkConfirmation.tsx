import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DLinkSimProps } from "./types";
import { useMutation } from "@apollo/client";
import DELINK_MSISDN from "../../graphql/DELINK_MSISDN";
import { setLoading } from "../../redux/actions/loadingActions";
import { useDispatch } from "react-redux";

const DelinkConfirmation: React.FC<DLinkSimProps> = ({
  isOpen,
  onClose,
  sim,
  confirmationEmailLabel,
  followLinkLabel,
  clickHereLabel,
  toResendLabel,
  mailNotReceivedLabel
}) => {
  const [delinkSim] = useMutation(DELINK_MSISDN, {
    variables: {
      msisdn: sim,
    },
  });
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered>
      <ModalOverlay />
      <ModalContent
        minHeight="auto"
        maxWidth={{ base: "100%", md: "400px" }}
        px="10px"
      >
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Box pt="33px" pb="42px">
            <Text
              fontSize="20px"
              fontWeight="bold"
              lineHeight="25px"
              letterSpacing="-0.01em"
              color="primary.800"
            >
              {confirmationEmailLabel}
            </Text>
            <Text
              mt="25px"
              mb="17px"
              fontSize="18px"
              lineHeight="25px"
              letterSpacing="0.25px"
              color="black"
            >
              {followLinkLabel}
            </Text>
            <Text
              fontSize="14px"
              lineHeight="25px"
              letterSpacing="0.25px"
              color="black"
              as="span"
            >
              {mailNotReceivedLabel}
            </Text>
            <Text
              onClick={async () => {
                dispatch(setLoading(true));
                try {
                  await delinkSim();
                  toast({
                    title: confirmationEmailLabel,
                    status: "success",
                    isClosable: true,
                  });
                } catch (e) {
                  // eslint-disable-next-line no-empty
                }
                dispatch(setLoading(false));
              }}
              cursor="pointer"
              fontSize="14px"
              fontWeight="bold"
              textDecoration="underline"
              lineHeight="25px"
              letterSpacing="0.25px"
              color="secondary.500"
              as="span"
            >
              {clickHereLabel}
            </Text>
            <Text
              fontSize="14px"
              lineHeight="25px"
              letterSpacing="0.25px"
              color="black"
              as="span"
            >
              {toResendLabel}
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DelinkConfirmation;
