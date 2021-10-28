import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LoginTabsProps, RegisterFormSchema } from "./types";
import Button from "../Button/Button";
import Link from "../Link/Link";
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
      errors.email = "Please enter a email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Please enter a password";
    } else if (password.length <= 7 || password.length > 256) {
      errors.password = "Password must be atleast 8 characters";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please enter a password";
    } else if (confirmPassword.length <= 7 || confirmPassword.length > 256) {
      errors.confirmPassword = "Password must be atleast 8 characters";
    } else if (password !== confirmPassword)
      errors.confirmPassword = "Confirm password must match the password ";
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data: registerResponse } = await registerUser({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          // console.log(registerResponse);
          /*
          setUserToken(userInfo.email);
          dispatch(saveUserToken({ token: userInfo.email }));
*/
          history.push(`/verify-register-mobile`, {
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
                {showPassword ? "Hide" : "Show"}
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
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </FormikInput>
            
            <Button
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

export default RegisterTab;
