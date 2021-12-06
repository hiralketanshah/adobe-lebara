import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { AttachYourSimDialogProps } from "./types";
import Button from "../Button/Button";
import AutoTopupIcon from "../../assets/images/AutoPopup.png";
import { Formik } from "formik";
import FormikInput from "../Formik/FormikInput/FormikInput";
import { phoneNumberRegex } from "../Formik/validations/regeularExpressions";
import { useMutation } from "@apollo/client";
import LINK_MSISDN_SPS from "../../graphql/LINK_MSISDN_SPS";
import ActivateYourSimMobile from "../AttachSim/ActivateYourSimMobile";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/selectors/userSelectors";
import { useHistory } from "react-router";
import { globalConfigs as GC, globalConstants as GCST} from "../../GlobalConfigs";
const validate = (values: any) => {
  const errors: any = {};
  if (!values.msisdn) {
    errors.msisdn = "Required";
  } else if (!phoneNumberRegex.test(values.msisdn)) {
    errors.msisdn = "Please enter 10-12 digits including 0";
  }

  return errors;
};
const AttachYourSimDialog: React.FC<AttachYourSimDialogProps> = ({
  open,
  close,
  title,
  linkSimLabel,
  noSimLabel,
  ctaContinueLabel,
  mobilePlaceholderLabel
}) => {
  const [linkMsisdnSPS, { loading }] = useMutation(LINK_MSISDN_SPS);
  const [showActivateYourSimMobile, setShowActivateYourSimMobile] =
    useState(false);
  const email = useSelector(selectEmail);
  const history = useHistory();

  return (
    <Modal isOpen={open} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent minHeight="auto" maxWidth="375px">
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody px="30px" pb="25px">
          <Formik
            validate={validate}
            initialValues={{
              msisdn: "",
            }}
            onSubmit={(values, { setFieldError }) =>
              linkMsisdnSPS({
                variables: {
                  msisdn: values.msisdn,
                },
              })
                .then(() => {
                  history.push((GC.journeyPages[GCST.VERIFY_REGISTER_MOBILE]  || '/'), {
                    email,
                    mobile: values.msisdn,
                    openByDefault: true,
                    defaultStatus: "Working",
                  });
                })
                .catch((err) => {
                  if (err.message.endsWith('Reason: IDLE"')) {
                    setShowActivateYourSimMobile(true);
                    return;
                  }

                  setFieldError("msisdn", err.message);
                })
            }
          >
            {({ handleSubmit, values, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <ActivateYourSimMobile
                    open={showActivateYourSimMobile}
                    mobile={values.msisdn}
                    onEdit={() => setShowActivateYourSimMobile(false)}
                  />
                  <Flex
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Image src={AutoTopupIcon} height="55px" width="55px" />
                    <Text
                      fontWeight="bold"
                      fontSize="20px"
                      lineHeight="40px"
                      letterSpacing="-0.01em"
                      color="primary.800"
                    >
                       {title}
                    </Text>
                    <Text
                      fontSize="14px"
                      lineHeight="20px"
                      mb="8px"
                      letterSpacing="0.25px"
                      color="grey.300"
                      textAlign="center"
                    >
                     {linkSimLabel}
                    </Text>
                  </Flex>

                  <FormikInput
                    name="msisdn"
                    placeholder={mobilePlaceholderLabel}
                  />

                  <Button
                    mt="25px"
                    width="100%"
                    disabled={isSubmitting || loading}
                    type="submit"
                  >
                     {ctaContinueLabel}
                  </Button>

                  <Text
                    onClick={() => close()}
                    d="block"
                    mt="18px"
                    color="lightenPrimary.500"
                    fontFamily="Roboto"
                    fontSize="14px"
                    lineHeight="16px"
                    textAlign="center"
                    cursor="pointer"
                  >
                    {noSimLabel}
                  </Text>
                </Box>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttachYourSimDialog;
