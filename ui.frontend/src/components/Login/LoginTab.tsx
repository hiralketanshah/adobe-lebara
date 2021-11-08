import * as React from "react";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { writeStorage, deleteFromStorage } from "@rehooks/local-storage";
import { LoginFormSchema, LoginTabsProps } from "./types";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Link from "../Link/Link";
import AUTHENTICATE_USER_SPS from "../../graphql/AUTHENTICATE_USER_SPS";
import { googleAnalytics } from "../../utils/gtm";
import GET_PERSONAL_DETAILS from "../../graphql/GET_PERSONAL_DETAILS";
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
        new Promise<void>((resolve) => {
          client
            .query({ query: AUTHENTICATE_USER_SPS, variables: values })
            .then((res) => {
              if (res.data.authenticateUserSPS) {
                deleteFromStorage("newCustomer");
                writeStorage("loggedIn", true);
                writeStorage("portIn", "No"); // `${res.data.portIn}`
                writeStorage("crmId", res.data.authenticateUserSPS[1]); // `${res.data.crmId}`
                writeStorage("msisdn", res.data.authenticateUserSPS[0]);
                // google analytics
                googleAnalytics(null, {
                  crmId: res.data.authenticateUserSPS[1],
                  userId: null,
                  msisdn: `${res.data.authenticateUserSPS[0]}`,
                  portIn: "No", // `${res.data.portIn}`
                  language: "en",
                  loggedIn: "Yes",
                  newCustomer: "No",
                  contentGroup: "Login",
                  region: "DE",
                });
                if (isFromMenu) {
                  setTimeout(() => {
                    history.push(`${GC.DASHBOARD}`, {
                      msisdn: res.data.authenticateUserSPS[0],
                    });
                    resolve();
                  }, 0);
                  return;
                }
                if (isFromPostPaid) {
                  client
                  .query({ query: GET_PERSONAL_DETAILS })
                  .then((personalDetailsRes) => {
                    history.push(`${GC.POSTPAID_PREVIEW}`, {
                      personalDetails: {
                        firstName:
                          personalDetailsRes.data.getPersonalDetails?.name
                            ?.firstName,
                        lastName:
                          personalDetailsRes.data.getPersonalDetails?.name
                            ?.lastName,
                        emailId: values.email,
                        streetName:
                          personalDetailsRes.data.getPersonalDetails
                            ?.addresses[0].street || "",
                        houseNumber:
                          personalDetailsRes.data.getPersonalDetails
                            ?.addresses[0].houseNumber || "",
                        townCity:
                          personalDetailsRes.data.getPersonalDetails
                            ?.addresses[0].city || "",
                        zipCode:
                          personalDetailsRes.data.getPersonalDetails
                            ?.addresses[0].postCode || "",
                        addressLabel:
                          personalDetailsRes.data.getPersonalDetails
                            ?.addresses?.length > 0
                            ? `${
                                personalDetailsRes.data.getPersonalDetails
                                  ?.addresses[0].houseNumber || ""
                              } ${
                                personalDetailsRes.data.getPersonalDetails
                                  .addresses[0].street
                              }, ${
                                personalDetailsRes.data.getPersonalDetails
                                  .addresses[0].city
                              }, ${
                                personalDetailsRes.data.getPersonalDetails
                                  .addresses[0].postCode
                              }, Germany`
                            : undefined,
                      },
                      portIn: {},
                    });
                    resolve();
                  });
                return;
              }
              history.push(`${GC.ORDER_DETAILS}`);
              resolve();
            }
          })
          .catch((error) => {
            if (error.graphQLErrors && error.graphQLErrors[0].message) {
              setErrors({ email: error.graphQLErrors[0].message });
              resolve();
            }
          });
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
              <Link href={`${GC.RESET_PASSWORD}`}>{loginModuleProps.loginResetLinkTextLabel}</Link>{" "}
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
