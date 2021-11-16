import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  Box,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMobile } from "react-icons/all";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { VerifyMobileNumberFormProps } from "./types";

const VerifyMobileNumberForm: React.FC<VerifyMobileNumberFormProps> = ({
  heading,
  subHeading,
  frmFields,
  successMessages,
  timeCounter,
  initalCountdownValue,
}) => {
  const INITIAL_COUNT = initalCountdownValue || 60;
  const WORKING_STATUS = "Working";
  const STOP_STATUS = "Stop";
  const [verifyClicked, onVerifyClicked] = useState<boolean>(false);
  const [updatedMobileNumber, setUpdatedMobileNumber] = useState("");
  const [updatedEmailAddress, setUpdatedEmailAddress] = useState("");
  const [updatedVerificationCode, setUpdatedVerificationCode] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(INITIAL_COUNT);
  const [status, setStatus] = React.useState(STOP_STATUS);

  React.useEffect(() => {
    let counterId: any;
    if (status === WORKING_STATUS) {
      if (counter >= 1) {
        counterId = setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setStatus(STOP_STATUS);
      }
    }
    return () => {
      clearTimeout(counterId);
    };
  }, [counter, status]);

  const onClose = () => setIsOpen(false);

  const handleVerifyMobileNumberClick = () => {
    onVerifyClicked(true);
    setIsOpen(true);
    setStatus(WORKING_STATUS);
  };

  const handleVerifyContinueClick = () => {};

  const handleMobileNumberChange = (event: any) => {
    setUpdatedMobileNumber(event.target.value);
  };

  const handleEmailAddressChange = (event: any) => {
    setUpdatedEmailAddress(event.target.value);
  };

  const handleVerificationCodeChange = (event: any) => {
    setUpdatedVerificationCode(event.target.value);
  };

  const onEditMobileNumberClick = () => {
    setUpdatedMobileNumber("");
    onVerifyClicked(false);
    setIsOpen(false);
  };

  const onResendVarificationCodeClick = () => {
    setUpdatedVerificationCode("");
  };

  const verifyButtonEnabled =
    updatedMobileNumber.length > 0 && updatedEmailAddress.length > 0;

  const continueButtonEnabled = updatedVerificationCode.length === 4;

  return (
    <Box p="20px 14px" background="white" borderRadius="lg">
      <Box textAlign="center">
        <Box display="inline-block">
          <AiOutlineMobile size={40} color="grey" />
        </Box>
        {heading && <Text
          fontWeight="bold"
          lineHeight="22px"
          textAlign="center"
          fontSize="18px"
          color="bodyCopy"
          mt=".5em"
        >
          {heading}
        </Text>}
        {isOpen ? (
          <Box my="2em">
            <Alert status="success" colorScheme="primary.800" borderRadius="lg">
              <Box flex="1">
                <AlertDescription
                  display="block"
                  color="white"
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="22px"
                  textAlign="left"
                >
                  {successMessages?.otpSentSuccessfullyMsg} {updatedMobileNumber}
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
          </Box>
        ) : (
          <></>
        )}
        {!verifyClicked && subHeading ? (
          (<Box mt=".5em">
            <Text
              fontWeight="500"
              textAlign="center"
              fontSize="18px"
              lineHeight="22px"
            >
              {subHeading}
            </Text>
          </Box>)
        ) : (
          <></>
        )}
      </Box>
      <Box mt="2em">
        <Input
          label={frmFields.emailLabel}
          type="email"
          placeholder={frmFields.emailPlaceholder}
          mb="26px"
          onChange={handleEmailAddressChange}
        />
      </Box>

      <Input
        label={frmFields.mobileLabel}
        placeholder={frmFields.mobilePlaceHolder}
        type="number"
        onChange={handleMobileNumberChange}
        value={updatedMobileNumber}
      />
      {verifyClicked ? (
        <>
          <Box mb=".5em">
            <Button
              colorScheme="blackAlpha"
              variant="link"
              size="sm"
              textTransform="none"
              color="black"
              onClick={onEditMobileNumberClick}
              fontWeight="400"
            >
              {frmFields.ctaEditMobileLabel}
            </Button>
          </Box>
          <Input
            label={frmFields.verifyCodeLabel}
            fontWeight="bold"
            fontSize="20px"
            lineHeight="32px"
            letterSpacing="15px"
            color="black"
            value={updatedVerificationCode}
            onChange={handleVerificationCodeChange}
          />
          <Box mb=".5em" display="flex">
            <Button
              colorScheme="blackAlpha"
              variant="link"
              size="sm"
              textTransform="none"
              color="black"
              disabled={counter !== 0}
              onClick={onResendVarificationCodeClick}
              fontWeight="300"
              lineHeight="14.06px"
            >
              {frmFields.ctaResendVerificationLabel}
            </Button>
            {counter !== 0 ? (
              <Box pt="1em" display="flex">
                &nbsp;
                <Text
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="14.06px"
                  color="#24AD7A"
                >
                  {timeCounter?.label1}
                </Text>
                &nbsp;
                <Text
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="14.06px"
                  color="black"
                >
                  {timeCounter?.label2}: {counter}
                </Text>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </>
      ) : (
        <></>
      )}

      {!verifyClicked ? (
        <Button
          isFullWidth
          disabled={!verifyButtonEnabled}
          onClick={handleVerifyMobileNumberClick}
          marginTop="2.5em"
        >
        {frmFields.ctaVerifyMobileLabel}
        </Button>
      ) : (
        <Button
          isFullWidth
          marginTop="1em"
          disabled={!continueButtonEnabled}
          onClick={handleVerifyContinueClick}
        >
          {frmFields.ctaContinueLabel}
        </Button>
      )}

      {!verifyClicked ? (
        <Box textAlign="center" mt=".5em">
          <Text
            as="ins"
            fontSize="14px"
            textAlign="center"
            color="#EA4984"
            fontWeight="400"
          >
            {frmFields.ctaSkipLabel}
          </Text>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default VerifyMobileNumberForm;
