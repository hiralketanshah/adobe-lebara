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
import { globalConstants as GC } from "../../GlobalConfigs";

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
      errors.email = loginModuleProps.loginEmailMobileErrMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      if (!/^[0-9]+$/i.test(email))
        errors.email = loginModuleProps.loginEmailMobileErrMessage;
    }
    if (!password) errors.password = loginModuleProps.passwordFieldErrorMessage;

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
                history.push(`/${GC.DASHBOARD}`);
                return;
              }
              if (isFromPostPaid) {
                history.push(`/${GC.POSTPAID_PREVIEW}`, {
                  personalDetails: {
                    firstName: "",
                    lastName: "",
                    emailId: "",
                    streetName: "",
                    houseNumber: "",
                    townCity: "",
                    addition: "",
                    zipCode: "",
                    addressLabel: "",
                  },
                  portIn: {},
                });
                return;
              }
              history.push(`/${GC.ORDER_DETAILS}`);
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
              label={loginModuleProps.loginEmailAddressLabel}
              isRequired
            />
            <FormikInput
              name="password"
              label={loginModuleProps.loginPasswordLabel}
              inputProps={{ type: "password" }}
              isRequired
            />
            <Text fontSize={14} fontWeight="400" mb="5px">
              {loginModuleProps.loginForgotPassWordmsg}{" "}
              <Link href={`/${GC.RESET_PASSWORD}`}>{loginModuleProps.loginResetLinkTextLabel}</Link>{" "}
            </Text>
            <Button
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
              isFullWidth
              type="submit"
            >
              {loginModuleProps.loginButton}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default LoginTab;
