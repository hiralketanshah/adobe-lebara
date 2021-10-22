import React, { useState } from "react";
import { Formik } from "formik";
import { Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { HiOutlineExclamation } from "react-icons/all";

import VALIDATE_INTERNAL_SIM from "../../graphql/VALIDATE_INTERNAL_SIM";
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
      errors.email = "Please enter a email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!lebaraMobile)
      errors.lebaraMobile = "Please enter a lebara mobile number";
    else if (!phoneNumberRegex.test(lebaraMobile))
      errors.lebaraMobile = "Please enter 10-12 digits including 0";
    if (!confirmLebaraMobile)
      errors.confirmLebaraMobile = "Please enter a lebara mobile number";
    else if (!phoneNumberRegex.test(confirmLebaraMobile))
      errors.confirmLebaraMobile = "Please enter 10-12 digits including 0";
    else if (lebaraMobile !== confirmLebaraMobile)
      errors.confirmLebaraMobile = "Mobile numbers doesn't matched";
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
              history.push(`/order-details`, {
                email: values.email,
                phoneNumber: values.lebaraMobile,
                isGuest: true,
                portIn: {
                  msisdn: values.lebaraMobile,
                },
              });
            } else if (res.error) {
              setValidLebaraSim("Please use a valid lebara mobile number");
            }
          })
          .catch(() => {
            setValidLebaraSim("Please use a valid lebara mobile number");
          });
      }}
      validate={validate}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gridGap="20px">
            <FormikInput name="email" label="Email Address" isRequired />
            <FormikInput
              name="lebaraMobile"
              label="Lebara Mobile Number"
              isRequired
            />
            <FormikInput
              name="confirmLebaraMobile"
              label="Confirm Lebara Mobile Number"
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
              Continue
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default GuestTab;
