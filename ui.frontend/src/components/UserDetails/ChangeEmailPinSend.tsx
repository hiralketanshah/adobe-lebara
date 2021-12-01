import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { ChangeEmailPinSendProps, PinSendSchema } from "./types";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Button from "../Button/Button";

const ChangeEmailPinSend: React.FC<ChangeEmailPinSendProps> = ({
  isOpen,
  onClose,
  mobile,
}) => {
  const initialValues = {
    pin: "",
  };
  const validate = () => {
    const errors: PinSendSchema = {};
    return errors;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="8px" minHeight="auto">
        <ModalBody
          py={{ base: "42px", lg: "47px" }}
          px={{ base: "18px", lg: "74px" }}
          w="auto"
          bgColor="white"
          borderRadius="8px"
        >
          <Flex flexDirection="column">
            <Box
              bgColor="primary.800"
              pt="18px"
              pb="14px"
              pl="30px"
              borderRadius="8px"
              mb="31px"
            >
              <Text
                color="white"
                fontWeight="500"
                fontSize="12px"
                lineHeight="14px"
                letterSpacing="0.25px"
              >
                Enter the Pin sent to {mobile}
              </Text>
            </Box>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={() => {
                onClose();
              }}
            >
              {({ errors, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Text
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="22px"
                    mt="16px"
                  >
                    Mobile Number
                  </Text>
                  <Text
                    mt="6px"
                    border="0.7px solid #C8C8C8"
                    borderRadius="12px"
                    py="14px"
                    px="24px"
                    bgColor="grey.50"
                  >
                    {mobile}
                  </Text>
                  <FormikInput
                    name="pin"
                    label="Pin Number"
                    labelProps={{ mt: "17px" }}
                    inputProps={{ mt: "5px", w: { base: "100%", lg: "414px" } }}
                    isRequired
                  />
                  <Text
                    fontSize="14px"
                    lineHeight="16px"
                    color="secondary.500"
                    textDecoration="underline"
                    mt="13px"
                    cursor="pointer"
                  >
                    Resend Pin
                  </Text>
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      w={{ base: "100%", lg: "324px" }}
                      mt={{ base: "40px", lg: "45px" }}
                      isDisabled={Object.keys(errors).length > 0}
                      type="submit"
                    >
                      Continue
                    </Button>
                    <Button
                      w={{ base: "100%", lg: "324px" }}
                      mt="15px"
                      variant="outline"
                    >
                      cancel
                    </Button>
                  </Flex>
                </form>
              )}
            </Formik>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEmailPinSend;
