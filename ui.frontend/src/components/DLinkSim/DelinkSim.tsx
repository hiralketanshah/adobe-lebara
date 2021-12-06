import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import { DLinkSimProps } from "./types";
import DelinkIcon from "../../assets/images/dLink.png";
import { useMutation } from "@apollo/client";
import DELINK_MSISDN from "../../graphql/DELINK_MSISDN";
import { setLoading } from "../../redux/actions/loadingActions";
import { useDispatch } from "react-redux";
import getDynamicValues from "../../utils/get-aem-dynamic-values";

const DelinkSim: React.FC<DLinkSimProps> = ({ sim,
  isOpen,
  onClose,
  delinkLabel,
  delinkConfirmationMsg,
  ctaContinueLabel }) => {
  const dispatch = useDispatch();
  const [delinkSim] = useMutation(DELINK_MSISDN, {
    variables: {
      msisdn: sim,
    },
  });
  const handleConfirm = async () => {
    dispatch(setLoading(true));
    try {
      await delinkSim();
      onClose(true);
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    dispatch(setLoading(false));
  };
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
          <Flex pt="15px" pb="55px" alignItems="center" flexDirection="column">
            <Image src={DelinkIcon} />
            <Text
              mt="7px"
              fontSize="20px"
              fontWeight="bold"
              lineHeight="40px"
              letterSpacing="-0.01em"
              color="primary.800"
              textAlign="center"
            >
              {delinkLabel}
            </Text>
            <Text
              mt="17px"
              fontSize="18px"
              lineHeight="25px"
              letterSpacing="0.25px"
              color="black"
              textAlign="center"
            >
              {getDynamicValues(delinkConfirmationMsg, [sim])}
            </Text>
            <Button mt="47px" width="100%" onClick={handleConfirm}>
              {ctaContinueLabel}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DelinkSim;
