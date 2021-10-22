import * as React from "react";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { LoginTabsProps, LoginFormSchema } from "./types";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Link from "../Link/Link";
import AUTHENTICATE_USER_SPS from "../../graphql/AUTHENTICATE_USER_SPS";

const LoginTab: React.FC<LoginTabsProps> = ({...loginModuleProps}) => {
  const history = useHistory();
  const client = useApolloClient();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values: LoginFormSchema) => {
    const errors: LoginFormSchema = {};
    const { email, password } = values;
    if (!email) {
      errors.email = "Please enter a email address/mobile number";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      if (!/^[0-9]+$/i.test(email))
        errors.email = "Please enter a valid email address/mobile number";
    }
    if (!password) errors.password = "Please enter a password";

    return errors;
  };
  const location =
    useLocation<{ fromPostPaid?: boolean; fromMenu?: boolean }>();
  const isFromPostPaid = location?.state?.fromPostPaid ?? false;
  const isFromMenu = location?.state?.fromMenu ?? false;

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setErrors }) =>
        client
          .query({ query: AUTHENTICATE_USER_SPS, variables: values })
          .then((res) => {
            if (res.data.authenticateUserSPS.accessToken) {
              if (isFromMenu) {
                history.push("/dashboard");
                return;
              }
              if (isFromPostPaid) {
                history.push("/postpaid/preview", {
                  personalDetails: {
                    firstName: "Test",
                    lastName: "User",
                    emailId: "test.user@gmail.com",
                    streetName: "26 Sprengelstraße",
                    houseNumber: "",
                    townCity: "Berlin",
                    addition: "Berlin",
                    zipCode: "13353",
                    addressLabel:
                      "Lebara Mobile, Sprengelstraße, Berlin, Germany",
                  },
                  portIn: {},
                });
                return;
              }
              history.push(`/order-details`);
            }
          })
          .catch((error) => {
            if (error.graphQLErrors && error.graphQLErrors[0].message) {
              setErrors({ email: error.graphQLErrors[0].message });
            }
          })
      }
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gridGap="20px">
            <FormikInput
              name="email"
              label="Email Address/Mobile Number"
              isRequired
            />
            <FormikInput
              name="password"
              label="Password/Mobile Number"
              inputProps={{ type: "password" }}
              isRequired
            />
            <Text fontSize={14} fontWeight="400" mb="5px">
              Forgotten your password?{" "}
              <Link href="/reset-password">Reset it</Link>{" "}
            </Text>
            <Button
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
              isFullWidth
              type="submit"
            >
              Login
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default LoginTab;
