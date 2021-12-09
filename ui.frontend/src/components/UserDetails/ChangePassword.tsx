import React from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import CHANGE_PASSWORD from "../../graphql/CHANGE_PASSWORD";
import FormikPassword from "../Formik/FormikPassword/FormikPassword";
import { ChangePasswordSchema, ChangePasswordProps, CompCPDefaultBindings } from "./types";
import Button from "../Button/Button";

const ChangePassword: React.FC<ChangePasswordProps> = ({
  changePasswordHeading = CompCPDefaultBindings?.changePasswordHeading,
  frmFields,
  validationMessages,
}) => {
  const [changePasswordMut] = useMutation(CHANGE_PASSWORD);
  const history = useHistory();
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validate = (values: ChangePasswordSchema) => {
    const errors: ChangePasswordSchema = {};
    const { oldPassword, newPassword, confirmPassword } = values;
    if (!oldPassword) errors.oldPassword = validationMessages?.oldPasswordRequiredMsg || CompCPDefaultBindings?.oldPasswordRequiredMsg;
    if (!newPassword) errors.newPassword = validationMessages?.newPasswordRequiredMsg || CompCPDefaultBindings?.newPasswordRequiredMsg;
    if (!confirmPassword) errors.confirmPassword = validationMessages?.confirmPasswordRequiredMsg || CompCPDefaultBindings?.confirmPasswordRequiredMsg;
    if (confirmPassword && newPassword && confirmPassword !== newPassword)
      errors.confirmPassword = validationMessages?.passwordNotMatchErrorMessage || CompCPDefaultBindings?.passwordNotMatchErrorMessage;

    return errors;
  };
  return (
    <Flex>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { oldPassword, newPassword } = values;
            await changePasswordMut({
              variables: {
                channel: "web",
                oldPassword,
                newPassword,
              },
            });
            history.push("/user-profile", { passwordUpdated: true });
          } catch (error: any) {
            if (error.graphQLErrors && error.graphQLErrors[0].message) {
              setErrors({ oldPassword: error.graphQLErrors[0].message });
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
              {changePasswordHeading}
            </Text>
            <FormikPassword
              name="oldPassword"
              label={frmFields?.oldPasswordLabel || CompCPDefaultBindings?.oldPasswordLabel}
              labelProps={{ mt: "17px" }}
              inputProps={{
                mt: "5px",
                w: { base: "100%", lg: "414px" },
              }}
              isShowHide
              isRequired
            />
            <FormikPassword
              name="newPassword"
              label={frmFields?.newPasswordLabel || CompCPDefaultBindings?.newPasswordLabel}
              labelProps={{ mt: "17px" }}
              inputProps={{
                mt: "5px",
                w: { base: "100%", lg: "414px" },
              }}
              isShowHide
              isRequired
            />
            <FormikPassword
              name="confirmPassword"
              label={frmFields?.confirmNewPasswordLabel || CompCPDefaultBindings?.confirmNewPasswordLabel}
              labelProps={{ mt: "17px" }}
              inputProps={{
                mt: "5px",
                w: { base: "100%", lg: "414px" },
              }}
              isShowHide
              isRequired
            />
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              mt={{ base: "23px", lg: "50px" }}
              mb={{ base: "42px", lg: "69px" }}
            >
              <Button
                width={{ base: "278px", lg: "355px" }}
                mt={{ base: "15px", lg: "19px" }}
                isDisabled={Object.keys(errors).length > 0 || isSubmitting}
                type="submit"
              >
                {frmFields?.ctaButtonLabel || CompCPDefaultBindings?.ctaButtonLabel}
              </Button>
              <Button
                width={{ base: "278px", lg: "355px" }}
                mt={{ base: "15px", lg: "19px" }}
                variant="outline"
                onClick={() =>
                  history.push("/user-profile", { passwordUpdated: false })
                }
              >
                {frmFields?.ctaCancelLabel || CompCPDefaultBindings?.ctaCancelLabel}
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default ChangePassword;
