import React, { useState } from "react";
import { Formik } from "formik";
import { Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { HiOutlineExclamation } from "react-icons/all";

import VALIDATE_INTERNAL_SIM from "../../graphql/VALIDATE_INTERNAL_SIM";

import { globalConstants as GC } from  '../../GlobalConfigs.js';

import { GuestFormSchema, LoginTabsProps } from "./types";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import { phoneNumberRegex } from "../Formik/validations/regeularExpressions";

const GuestTab: React.FC<LoginTabsProps> = ({...loginModuleProps}) => {
  const history = useHistory();
  const client = useApolloClient();
  const [validLebaraSim, setValidLebaraSim] = useState("");
  const initialValues = {
    email: "",
    lebaraMobile: "",
    confirmLebaraMobile: "",
  };

  const validate = (values: GuestFormSchema) => {
    setValidLebaraSim("");
    const errors: GuestFormSchema = {};
    const { email, lebaraMobile, confirmLebaraMobile } = values;
    if (!email) {
      errors.email = loginModuleProps.emailFieldErrorMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = loginModuleProps.validEmailFieldErrorMessage;
    }
    if (!lebaraMobile)
      errors.lebaraMobile = loginModuleProps.mobileNumberNotMatchErrorMessage;
    else if (!phoneNumberRegex.test(lebaraMobile))
      errors.lebaraMobile = loginModuleProps.mobileNumberFieldPattern;
    if (!confirmLebaraMobile)
      errors.confirmLebaraMobile = loginModuleProps.mobileNumberNotMatchErrorMessage;
    else if (!phoneNumberRegex.test(confirmLebaraMobile))
      errors.confirmLebaraMobile = loginModuleProps. mobileNumberFieldPattern;
    else if (lebaraMobile !== confirmLebaraMobile)
      errors.confirmLebaraMobile = loginModuleProps.mobileNumberNotMatchErrorMessage;
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const variables = {
          msisdn: values.lebaraMobile,
          country: "DE",
        };
        return client
          .query({ query: VALIDATE_INTERNAL_SIM, variables })
          .then((res) => {
            if (res.data.validateGuestLogin) {
              history.push(`${GC.ORDER_DETAILS}`, {
                email: values.email,
                phoneNumber: values.lebaraMobile,
                isGuest: true,
                portIn: {
                  msisdn: values.lebaraMobile,
                },
              });
            } else if (res.error) {
              setValidLebaraSim(loginModuleProps.validMobileNumberErrorMessage);
            }
          })
          .catch(() => {
            setValidLebaraSim(loginModuleProps.validMobileNumberErrorMessage);
          });
      }}
      validate={validate}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gridGap="20px">
            <FormikInput name="email" label={loginModuleProps.guestEmailAddressLabel} isRequired />
            <FormikInput
              name="lebaraMobile"
              label={loginModuleProps.guestMobileNumberLabel}
              isRequired
            />
            <FormikInput
              name="confirmLebaraMobile"
              label={loginModuleProps.guestMobileNumberConfirmLabel}
              isRequired
            />
            {validLebaraSim && (
              <Flex color="unsuccessful" alignItems="center">
                <HiOutlineExclamation size={20} color="lebaraRed" />
                <Text paddingLeft="7px" noOfLines={1}>
                  {validLebaraSim}
                </Text>
              </Flex>
            )}
            <Button
              mt="20px"
              type="submit"
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
              isFullWidth
            >
              {loginModuleProps.registrationContinueButton}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default GuestTab;
