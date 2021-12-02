import * as React from "react";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { deleteFromStorage } from "@rehooks/local-storage";
import { LoginFormSchema, LoginTabsProps } from "./types";
import Button from "../Button/Button";
import FormikInput from "../Formik/FormikInput/FormikInput";
import Link from "../Link/Link";
import AUTHENTICATE_USER_SPS from "../../graphql/AUTHENTICATE_USER_SPS";
import { googleAnalytics } from "../../utils/gtm";
import GET_PERSONAL_DETAILS from "../../graphql/GET_PERSONAL_DETAILS";
import { globalConfigs as GC, globalConstants as GCST} from "../../GlobalConfigs";
import { saveUserInfo } from "../../redux/actions/userActions";
import { setLoading } from "../../redux/actions/loadingActions";
import { useDispatch } from "react-redux";

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
    useLocation<{ fromPostPaid?: boolean; fromMenu?: boolean; from?: Location;fromHeader?: boolean }>();
  const isFromPostPaid = location?.state?.fromPostPaid ?? false;
  const isFromHeader = location?.state?.fromHeader ?? false;
  const dispatch = useDispatch();
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
                dispatch(saveUserInfo(res.data.authenticateUserSPS));

                if (location.state?.from) {
                  dispatch(setLoading(false));
                  history.push(location.state?.from);
                  resolve();
                  return;
                }
                deleteFromStorage("newCustomer");
                // google analytics
                googleAnalytics(null, {
                  crmId: res.data.authenticateUserSPS.crmId,
                  userId: null,
                  msisdn: `${res.data.authenticateUserSPS.msisdn[0]}`,
                  portIn: "No", // `${res.data.portIn}`
                  language: "en",
                  loggedIn: "Yes",
                  newCustomer: "No",
                  contentGroup: "Login",
                  region: "DE",
                });
                if (isFromHeader) {
                  setTimeout(() => {
                    history.push((GC.journeyPages[GCST.DASHBOARD]  || '/'), {
                      msisdn: res.data?.authenticateUserSPS?.msisdn[0]
                    });
                    resolve();
                  }, 0);
                  return;
                }
                if (isFromPostPaid) {
                  client
                  .query({ query: GET_PERSONAL_DETAILS })
                  .then((personalDetailsRes) => {
                    const { getPersonalDetails } = personalDetailsRes && personalDetailsRes.data ? personalDetailsRes.data : null;

                    history.push((GC.journeyPages[GCST.POSTPAID_PREVIEW]  || '/'), {
                      personalDetails: {
                        firstName: getPersonalDetails?.name?.firstName,
                        lastName: getPersonalDetails?.name?.lastName,
                        emailId: values.email,
                        streetName: getPersonalDetails?.addresses[0].street || "",
                        houseNumber: getPersonalDetails?.addresses[0].houseNumber || "",
                        townCity: getPersonalDetails?.addresses[0].city || "",
                        zipCode: getPersonalDetails?.addresses[0].postCode || "",
                        addressLabel: getPersonalDetails?.addresses?.length > 0
                            ? `${
                                getPersonalDetails?.addresses[0].houseNumber || ""
                              } ${
                                getPersonalDetails?.addresses[0].street
                              }, ${
                                getPersonalDetails?.addresses[0].city
                              }, ${
                                getPersonalDetails?.addresses[0].postCode
                              }, Germany`
                            : undefined,
                      },
                      portIn: {},
                    });
                    resolve();
                  });
                return;
              }
              history.push( (GC.journeyPages[GCST.ORDER_DETAILS]  || '/'));
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
              <Link href={(GC.journeyPages[GCST.RESET_PASSWORD]  || '/')}>{loginModuleProps.loginResetLinkLabel}</Link>{" "}
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
