import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { writeStorage } from "@rehooks/local-storage";
import { LoginTabsProps, RegisterFormSchema } from "./types";
import { globalConfigs as GC, globalConstants as GCST } from  '../../GlobalConfigs.js';
import Button from "../Button/Button";
import REGISTER_USER_SPS from "../../graphql/REGISTER_USER_SPS";
import FormikInput from "../Formik/FormikInput/FormikInput";

const RegisterTab: React.FC<LoginTabsProps> = ({...loginModuleProps}) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const [registerUser] = useMutation(REGISTER_USER_SPS);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: RegisterFormSchema) => {
    const errors: RegisterFormSchema = {};

    const { email, password, confirmPassword } = values;
    if (!email) {
      errors.email = loginModuleProps.emailFieldErrorMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = loginModuleProps.errorEmailPatternValidMsg;
    }
    if (!password) {
      errors.password = loginModuleProps.passwordFieldErrorMessage;
    } else if (password.length <= 7 || password.length > 256) {
      errors.password = loginModuleProps.errorPasswordPatternMinMsg;
    }
    if (!confirmPassword) {
      errors.confirmPassword = loginModuleProps.confirmPasswordFieldErrorMsg;
    } else if (confirmPassword.length <= 7 || confirmPassword.length > 256) {
      errors.confirmPassword = loginModuleProps.errorPasswordPatternMinMsg;
    } else if (password !== confirmPassword)
      errors.confirmPassword = loginModuleProps.errorConfirmPasswordPatternNotMatchMsg;
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        try {
          await registerUser({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          writeStorage("newCustomer", true);
          writeStorage("loggedIn", true);
          writeStorage("msisdn", null);
          /*
          setUserToken(userInfo.email);
          dispatch(saveUserToken({ token: userInfo.email }));
          */
          history.push( (GC.journeyPages[GCST.VERIFY_REGISTER_MOBILE]  || '/'), {
            email: values.email,
          });
          // TODO once OTP is ready.
          // history.push("/verify-register-mobile");
        } catch (error: any) {
          if (error.graphQLErrors && error.graphQLErrors[0].message) {
            setErrors({ email: error.graphQLErrors[0].message });
          }
        }
      }}
      validate={validate}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gridGap="20px">
            <FormikInput
                name="email"
                label={loginModuleProps.registrationEmailAddress}
                isRequired
              />
              
            <FormikInput
              name="password"
              label={loginModuleProps.registrationPassword}
              inputProps={{ type: showPassword ? "text" : "password" }}
              isRequired
              revealInputToggle={true}
              >
              <Button
                size="sm"
                onClick={handleShowClick}
                height="initial"
                variant="ghost"
                color="secondary.500"
                position="absolute"
                _hover={{
                  backgroundColor: "inherit",
                }}
              >
                {showPassword ? loginModuleProps.hideLabel || "Hide" : loginModuleProps.showLabel || "Show"}
              </Button>
            </FormikInput>

            <FormikInput
              name="confirmPassword"
              label={loginModuleProps.registrationConfirmPassword}
              inputProps={{ type: showConfirmPassword ? "text" : "password" }}
              isRequired
              revealInputToggle={true}
            >
              <Button
                size="sm"
                onClick={handleConfirmClick}
                height="initial"
                variant="ghost"
                color="secondary.500"
                position="absolute"
                _hover={{
                  backgroundColor: "inherit",
                }}
              >
                {showConfirmPassword ? loginModuleProps.hideLabel || "Hide" : loginModuleProps.showLabel || "Show"}
              </Button>
            </FormikInput>
            
            <Button
              type="submit"
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
              isFullWidth
            >
              {loginModuleProps.registrationCtaLabel}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default RegisterTab;
