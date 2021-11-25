import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import CHANGE_EMAIL from "../../graphql/CHANGE_EMAIL";
import { ChangeEmailProps, ChangeEmailSchema } from "./types";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Button from "../Button/Button";

const ChangeEmail: React.FC<ChangeEmailProps> = ({ isOpen, onClose }) => {
  const [changeEmailMut] = useMutation(CHANGE_EMAIL);
  const initialValues = {
    email: "",
    confirmEmail: "",
  };
  const validate = (values: ChangeEmailSchema) => {
    const errors: ChangeEmailSchema = {};
    const { email, confirmEmail } = values;
    if (!email) {
      errors.email = "Please enter a email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!confirmEmail) {
      errors.confirmEmail = "Please enter a email address";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(confirmEmail)
    ) {
      errors.confirmEmail = "Please enter a valid email address";
    } else if (email !== confirmEmail) {
      errors.confirmEmail =
        "Email address and Confirm email address shoule be same";
    }
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
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values, { setErrors }) => {
                try {
                  await changeEmailMut({
                    variables: {
                      newEmail: values.email,
                      crmId: "",
                    },
                  });
                  onClose(true, values.email);
                } catch (error: any) {
                  if (error.graphQLErrors && error.graphQLErrors[0].message) {
                    setErrors({ email: error.graphQLErrors[0].message });
                  }
                }
              }}
            >
              {({ errors, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Text
                    fontWeight="500"
                    fontSize="20px"
                    lineHeight="22px"
                    letterSpacing="0.15px"
                    pb="20px"
                  >
                    Change Email Address
                  </Text>
                  <FormikInput
                    name="email"
                    label="New Email Address"
                    labelProps={{ mt: "17px" }}
                    inputProps={{ mt: "5px", w: { base: "100%", lg: "414px" } }}
                    placeholder="Enter new email address"
                    isRequired
                  />
                  <FormikInput
                    name="confirmEmail"
                    label="Confirm New Email Address"
                    labelProps={{ mt: "17px" }}
                    inputProps={{ mt: "5px", w: { base: "100%", lg: "414px" } }}
                    placeholder="Confirm new email address"
                    isRequired
                  />
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      w={{ base: "100%", lg: "324px" }}
                      mt={{ base: "40px", lg: "45px" }}
                      isDisabled={
                        Object.keys(errors).length > 0 || isSubmitting
                      }
                      type="submit"
                    >
                      Continue
                    </Button>
                    <Button
                      w={{ base: "100%", lg: "324px" }}
                      mt="15px"
                      variant="outline"
                      onClick={() =>
                        onClose(false, "shubhamgoyal2243@gmail.com")
                      }
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

export default ChangeEmail;
