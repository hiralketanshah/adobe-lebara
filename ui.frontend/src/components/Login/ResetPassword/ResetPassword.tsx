import * as React from "react";
import { Box, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { LoginTabsProps } from "../types";
import RadioButton from "../../RadioButton/RadioButton";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import {
  EMAIL_FIELD_PATTERN,
  NUMBER_FIELD_PATTERN,
} from "../../../utils/lebara.constants";
import LebaraText from "../../LebaraText/LebaraText";

import { globalConstants as GC} from "../../../GlobalConfigs";

const ResetPassword: React.FC<LoginTabsProps> = ({...rpProps}) => {
  const history = useHistory();
  const PASSWORD_TYPE_EMAIL = "emailAddress";
  const PASSWORD_TYPE_MOBILE_NUMBER = "mobileNumber";
  const [resetPasswordType, setResetPasswordType] =
    React.useState(PASSWORD_TYPE_EMAIL);
  const [isEmailFieldValid, setIsEmailFieldValid] = React.useState(false);
  const [isMobileNumberValid, setIsMobileNumberValid] = React.useState(false);
  const [inputTypeEmail, setInputTypeEmail] = React.useState("");
  const [inputTypeMobileNumber, setInputTypeMobileNumber] = React.useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEmailAddressValid = EMAIL_FIELD_PATTERN.test(event.target.value);
    setInputTypeEmail(event.target.value);
    setIsEmailFieldValid(isEmailAddressValid);
  };

  const onResetClick = () => {
    let userInputPassword: string | number;
    let userInputType: string;
    if (resetPasswordType === PASSWORD_TYPE_EMAIL) {
      userInputPassword = inputTypeEmail;
      userInputType = PASSWORD_TYPE_EMAIL;
    } else {
      userInputPassword = inputTypeMobileNumber;
      userInputType = PASSWORD_TYPE_MOBILE_NUMBER;
    }
    history.push(`${GC.CREATE_NEW_PASSWORD}`, {
      userInput: userInputPassword,
      typeUserInput: userInputType,
    });
  };

  const handleMobileNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInputMobileNumber = event.target.value;
    setInputTypeMobileNumber(userInputMobileNumber);
    setIsMobileNumberValid(
      NUMBER_FIELD_PATTERN.test(userInputMobileNumber) &&
        userInputMobileNumber.length >= 10 &&
        userInputMobileNumber.length <= 12
    );
  };

  return (
    <Box>
      <Box
        py={{ base: "18px", md: "30px" }}
        pl={{ base: "18px", md: "85px" }}
        pr={{ base: "18px", md: "40px" }}
      >
        <Box>
          <Text
            fontWeight="900"
            fontSize="22px"
            lineHeight="40px"
            color="lightenPrimary.150"
          >
            {rpProps.resetPwdTitle}
          </Text>
          <Text fontWeight="500" fontSize="14px" color="bodyCopy">
            {rpProps.resetPwdDescription}
          </Text>
        </Box>
        <Box mt="23px">
          <RadioGroup
            onChange={setResetPasswordType}
            name="resetPasswordType"
            value={resetPasswordType}
          >
            <Stack direction="row">
              <RadioButton value={PASSWORD_TYPE_EMAIL}>
                <LebaraText
                  type="body1"
                  fontSize="16px"
                  lineHeight="22px"
                  letterSpacing="0.5px"
                  color="primary.800"
                >
                  {rpProps.resetPwdEmailLabel}
                </LebaraText>
              </RadioButton>

              <RadioButton value={PASSWORD_TYPE_MOBILE_NUMBER}>
                <LebaraText
                  type="body1"
                  fontSize="16px"
                  lineHeight="22px"
                  letterSpacing="0.5px"
                  color="primary.800"
                >
                  {rpProps.resetPwdMobileLabel}
                </LebaraText>
              </RadioButton>
            </Stack>
          </RadioGroup>
        </Box>
        <Box mt="32px">
          {resetPasswordType === PASSWORD_TYPE_EMAIL ? (
            <>
              <Box>
                <Text
                  color="bodyCopy"
                  fontSize={16}
                  fontWeight="bold"
                  as="span"
                >
                  {rpProps.resetPwdEmailLabel}
                </Text>
                <Input
                  name="email"
                  mb="26px"
                  mt="0.5rem"
                  border="0.7px solid #8C8FA2"
                  bgColor="inputFieldBgColor"
                  value={inputTypeEmail}
                  onChange={handleEmailChange}
                />
              </Box>
              <Box mt="18px">
                <Button
                  isFullWidth
                  isDisabled={!isEmailFieldValid}
                  backgroundColor="primary.500"
                  borderRadius="lg"
                  onClick={onResetClick}
                >
                  <Text>{rpProps.resetPwdButtonLabel}</Text>
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Text
                  color="bodyCopy"
                  fontSize={16}
                  fontWeight="bold"
                  as="span"
                >
                  {rpProps.resetPwdMobileLabel}
                </Text>
                <Input
                  name="mobile"
                  mb="26px"
                  mt="0.5rem"
                  border="0.7px solid #8C8FA2"
                  bgColor="inputFieldBgColor"
                  value={inputTypeMobileNumber}
                  onChange={handleMobileNumberChange}
                />
              </Box>
              <Box mt="18px">
                <Button
                  isFullWidth
                  isDisabled={!isMobileNumberValid}
                  backgroundColor="primary.500"
                  borderRadius="lg"
                  onClick={onResetClick}
                >
                  <Text>{rpProps.resetPwdButtonLabel}</Text>
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Box mt="25px">
          <Button isFullWidth borderRadius="lg" variant="outline">
            <Text>{rpProps.resetPwdButtonCancelLabel}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
