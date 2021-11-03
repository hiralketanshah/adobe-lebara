import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  Box,
  CloseButton,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { CreateNewPasswordSchema } from "../types";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "../common.style.css";

const CreateNewPassword: React.FC<CreateNewPasswordSchema> = ({
  emailAddress,
  mobileNumber,
  ...createNewPwdProps
}) => {
  const history = useHistory();
  const [, setIsOpen] = React.useState(true);
  const onClose = () => setIsOpen(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);

  const getObscureEmail = () => {
    if (emailAddress) {
      const [name, domain] = emailAddress.split("@");
      return `${name[0]}${name[1]}${new Array(name.length).join(
        "*"
      )}@${domain}`;
    }
    return undefined;
  };

  const validationSchema = yup.object({
    pin: yup
      .string()
      .required(createNewPwdProps?.pinRequiredValidationMsg)
      .length(4, createNewPwdProps?.pinLengthValidationMsg),
    newPassword: yup
      .string()
      .min(8, createNewPwdProps?.pwdMinValdiationMsg)
      .max(256, createNewPwdProps?.pwdMaxValdiationMsg)
      .required(createNewPwdProps?.pwdRequiredValidationMsg),
    reenterNewPassword: yup
      .string()
      .required(createNewPwdProps?.pwdConfirmRequiredValidationMsg)
      .min(8, createNewPwdProps?.pwdMinValdiationMsg)
      .max(256, createNewPwdProps?.pwdMaxValdiationMsg)
      .when("newPassword", {
        is: (val: string | any[]) => val && val.length > 0,
        then: yup
          .string()
          .oneOf(
            [yup.ref("newPassword")],
            createNewPwdProps?.pwdConfirmMatchValidationMsg
          ),
      }),
  });

  const createNewPasswordFormik = useFormik({
    initialValues: {
      pin: "",
      newPassword: "",
      reenterNewPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const onResendPinClick = () => {
    createNewPasswordFormik.setFieldValue("pin", "");
  };

  const onContinueClick = () => {
    history.push("/login", { isPasswordResetSucessfull: true });
  };

  return (
    <Box borderRadius="md">
      <Box
        py={{ base: "18px", md: "35px" }}
        px={{ base: "18px", md: "60px" }}
        borderRadius="md"
      >
        <Alert status="success" colorScheme="primary.500" borderRadius="lg">
          <Box flex="1">
            <AlertDescription
              display="block"
              color="white"
              fontWeight="400"
              fontSize="12px"
              lineHeight="22px"
              textAlign="left"
            >
              {emailAddress
                ? `${createNewPwdProps?.alertSuccessSuffixMsg} ${getObscureEmail()}`
                : `${createNewPwdProps?.alertSuccessSuffixMsg} ${mobileNumber}`}
            </AlertDescription>
          </Box>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            color="white"
            size="sm"
            onClick={onClose}
          />
        </Alert>
        <Box mt="13px">
          <Text
            fontWeight="900"
            fontSize="22px"
            lineHeight="40px"
            color="primary.500"
          >
            {createNewPwdProps.compHeading}
          </Text>
          <Text fontWeight="500" fontSize="14px" color="explainerColor">
            {createNewPwdProps.compHeadingDescription}
          </Text>
        </Box>
        <Box mt="18px">
          <form onSubmit={createNewPasswordFormik.handleSubmit}>
            <Box>
              <Input
                name="pin"
                id="pin"
                label={createNewPwdProps.frmLabelPin}
                color="explainerColor"
                fontWeight="500"
                fontSize={14}
                lineHeight="16px"
                letterSpacing="16px"
                onChange={createNewPasswordFormik.handleChange}
                onBlur={createNewPasswordFormik.handleBlur}
                value={createNewPasswordFormik.values.pin}
              />
              {createNewPasswordFormik.touched.pin &&
              createNewPasswordFormik.errors.pin ? (
                <Text color="unsuccessful" fontWeight="400" fontSize={14}>
                  {createNewPasswordFormik.errors.pin}
                </Text>
              ) : (
                <></>
              )}
              <Button
                colorScheme="blackAlpha"
                variant="link"
                textTransform="none"
                color="explainerColor"
                fontWeight="500"
                fontSize="14px"
                lineHeight="16px"
                textDecoration="underline"
                onClick={onResendPinClick}
              >
                {createNewPwdProps.compResendPinText}
              </Button>
            </Box>
            <Box mb="26px">
              <InputGroup size="md" mt="0.5rem">
                <Input
                  name="newPassword"
                  id="newPassword"
                  label={createNewPwdProps.frmLabelNewPwd}
                  color="explainerColor"
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  letterSpacing="0.5em"
                  onChange={createNewPasswordFormik.handleChange}
                  onBlur={createNewPasswordFormik.handleBlur}
                  value={createNewPasswordFormik.values.newPassword}
                />
                <InputRightElement width="4.5rem" top="2rem">
                  <Button
                    size="sm"
                    onClick={handleShowClick}
                    height="initial"
                    variant="ghost"
                    color="linkButton"
                    _hover={{
                      backgroundColor: "white",
                      color: "linkButton",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
                <Text
                  fontSize="14px"
                  lineHeight="16px"
                  textDecoration="underline"
                  color="explainerColor"
                  mt="15px"
                >
                  {createNewPwdProps.pwdMinHint}
                </Text>
              </InputGroup>
              {createNewPasswordFormik.touched.newPassword &&
              createNewPasswordFormik.errors.newPassword ? (
                <Text color="unsuccessful" fontWeight="400" fontSize={14}>
                  {createNewPasswordFormik.errors.newPassword}
                </Text>
              ) : (
                <></>
              )}
            </Box>
            <Box mb="26px">
              <InputGroup size="md" mt="0.5rem">
                <Input
                  name="reenterNewPassword"
                  id="reenterNewPassword"
                  label={createNewPwdProps.frmLabelReEnterNewPwd}
                  color="explainerColor"
                  pr="4.5rem"
                  type={showConfirmPassword ? "text" : "password"}
                  letterSpacing="0.5em"
                  onChange={createNewPasswordFormik.handleChange}
                  onBlur={createNewPasswordFormik.handleBlur}
                  value={createNewPasswordFormik.values.reenterNewPassword}
                />

                <InputRightElement width="4.5rem" top="2rem">
                  <Button
                    size="sm"
                    onClick={handleConfirmClick}
                    height="initial"
                    variant="ghost"
                    color="linkButton"
                    _hover={{
                      backgroundColor: "white",
                      color: "linkButton",
                    }}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {createNewPasswordFormik.touched.reenterNewPassword &&
              createNewPasswordFormik.errors.reenterNewPassword ? (
                <Text color="unsuccessful" fontWeight="400" fontSize={14}>
                  {createNewPasswordFormik.errors.reenterNewPassword}
                </Text>
              ) : (
                <></>
              )}
            </Box>
            <Box mt="42px">
              <Button
                isDisabled={
                  !(
                    createNewPasswordFormik.isValid &&
                    createNewPasswordFormik.dirty
                  )
                }
                isFullWidth
                type="submit"
                textTransform="uppercase"
                onClick={onContinueClick}
              >
                {createNewPwdProps.frmBtnPrimaryLabel}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewPassword;
