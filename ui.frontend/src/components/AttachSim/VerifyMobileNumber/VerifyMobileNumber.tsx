import React, { ChangeEvent } from "react";
import {
  Alert,
  AlertDescription,
  Box,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

import { globalConfigs as GC, globalConstants as C } from  '../../../GlobalConfigs.js';
import { NUMBER_FIELD_PATTERN } from "../../../utils/lebara.constants";

import VerifyMobile from "../../../assets/images/AttachSimMobile.png";
import LINK_MSISDN_SPS from "../../../graphql/LINK_MSISDN_SPS";
import VERIFY_OTP from "../../../graphql/VERIFY_OTP";
import GET_SESSION_STATUS from "../../../graphql/GET_SESSION_STATUS";
import { saveUserInfo } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { VerifyMobileNumberProps } from "./types";

import Input from "../../Input/Input";
import Button from "../../Button/Button";

const VerifyMobileNumber: React.FC<VerifyMobileNumberProps> = ({
  heading,
  subHeading,
  frmFields,
  successMessages,
  timeCounter,
  initalCountdownValue,
}) => {
  // const userToken = useSelector((state: ReduxState) => state.user.token);
  const client = useApolloClient();
  const dispatch = useDispatch();

  const location = useLocation<{ email: string; mobile?: string }>();
  const userToken = location?.state?.email;
  const INITIAL_COUNT = initalCountdownValue || 60;
  const WORKING_STATUS = "Working";
  const STOP_STATUS = "Stop";
  const [updatedMobileNumber, setUpdatedMobileNumber] = React.useState(
    location?.state?.mobile
  );
  const [isMobileNumberValid, setIsMobileNumberValid] = React.useState(
    !!location?.state?.mobile
  );
  const [counter, setCounter] = React.useState(INITIAL_COUNT);
  const [status, setStatus] = React.useState(STOP_STATUS);
  const [isValidationMobileClicked, setIsValidationMobileClicked] =
    React.useState(false);
  const enableResendVericationCode = counter === 0;
  const [updatedVerificationCode, setUpdatedVerificationCode] =
    React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const [linkMsisdnSPS, { loading }] = useMutation(LINK_MSISDN_SPS);
  const [verifyOTP, { loading: isVerifyOtpLoading }] = useMutation(VERIFY_OTP);
  const [errorMessage, setErrorMessage] = React.useState("");
  const history = useHistory();
  const onChangeMobileNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const userInputMobileNumber = event.target.value;
    setUpdatedMobileNumber(userInputMobileNumber);
    setIsMobileNumberValid(
      NUMBER_FIELD_PATTERN.test(userInputMobileNumber) &&
        userInputMobileNumber.length >= 10 &&
        userInputMobileNumber.length <= 12
    );
  };
  const onResendVarificationCodeClick = () => {
    setCounter(INITIAL_COUNT);
    setUpdatedVerificationCode("");
    setStatus(WORKING_STATUS);
    linkMsisdnSPS({
      variables: {
        msisdn: updatedMobileNumber,
      },
    })
      .then(() => {
        setIsOpen(true);
        setStatus(WORKING_STATUS);
        setIsValidationMobileClicked(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  /*
    const onEditMobileNumberClick = () => {
      setUpdatedMobileNumber("");
      setIsMobileNumberValid(false);
    };
  */

  const handleVerificationCodeChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdatedVerificationCode(event.target.value);
  };

  const varificationCodeValidated = updatedVerificationCode?.length === 5;

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

  const onVerfyMobileNumberValidationClick = () => {
    linkMsisdnSPS({
      variables: {
        email: userToken,
        msisdn: updatedMobileNumber,
      },
    })
      .then(() => {
        setIsOpen(true);
        setStatus(WORKING_STATUS);
        setIsValidationMobileClicked(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  const onVerfyMobileNumberContinueClick = () => {
    verifyOTP({
      variables: {
        otpCode: updatedVerificationCode,
        msisdn: updatedMobileNumber,
      },
    })
      .then(() => {
        client
          .query({
            query: GET_SESSION_STATUS,
          })
          .then((res) => {
            dispatch(saveUserInfo(res.data.getSessionStatus));
            history.push( (GC.journeyPages[C.VERIFY_REGISTER_MOBILE]  || '/'), {
              msisdn: updatedMobileNumber,
              simLinkedPopup: true,
            });
          });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  /*
    const onSkipForNowClick = () => {};
  */
  return (
    <Box
      px={{ base: "18px", md: "125px" }}
      py={{ base: "18px", md: "28px" }}
      bgColor="white"
      borderRadius="8px"
    >
      <Flex
        justifyContent="center"
        flexDirection="column"
        width="100%"
        alignItems="center"
      >
        <Image height="27px" width="17px" src={VerifyMobile} />
        {heading && <Text
          mt="15px"
          fontWeight="bold"
          lineHeight="22px"
          fontSize="18px"
          color="bodyCopy"
        >
          {heading}
        </Text>}
      </Flex>
      {!isOpen && subHeading && (
        <Text
          fontSize="18px"
          lineHeight="22px"
          color="bodyCopy"
          textAlign="center"
          fontWeight="500"
          mt="10px"
          style={{ whiteSpace: "pre-line" }}
        >
          {subHeading}
        </Text>
      )}
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
      <Box mt="23px">
        <Input
          label={frmFields?.emailLabel}
          placeholder={frmFields?.emailPlaceholder}
          bgColor="grey.50"
          color="explainerColor"
          isDisabled
          value={userToken}
          height="45px"
        />
      </Box>
      <Box mt="23px">
        <FormControl>
          <Input
            label={frmFields?.mobileLabel}
            placeholder={frmFields?.mobilePlaceHolder}
            color="explainerColor"
            value={updatedMobileNumber}
            onChange={onChangeMobileNumber}
            isDisabled={isOpen}
            fontWeight="bold"
            height="45px"
          />
          {errorMessage && <Text color="unsuccessful">{errorMessage}</Text>}
        </FormControl>

        {/* <Button
          isDisabled={!isMobileNumberValid}
          variant="ghost"
          _hover={{ bgColor: "transparent" }}
          height="initial"
          onClick={onEditMobileNumberClick}
        >
          <Text
            fontSize="10px"
            lineHeight="16px"
            textDecoration="underline"
            color="explainerColor"
          >
            {frmFields?.ctaEditMobileLabel}
          </Text>
        </Button> */}
      </Box>
      {isValidationMobileClicked ? (
        <Box mt="21px">
          <Input
            label={frmFields?.verifyCodeLabel}
            placeholder={frmFields?.verifyCodeLabel}
            maxLength={5}
            fontWeight={updatedVerificationCode ? "bold" : "normal"}
            fontSize={updatedVerificationCode ? "20px" : "14px"}
            lineHeight="32px"
            letterSpacing={updatedVerificationCode ? "15px" : "initial"}
            color="explainerColor"
            value={updatedVerificationCode}
            onChange={handleVerificationCodeChange}
          />
          <Flex fontSize="14px" lineHeight="16px" mt="5px" alignItems="center">
            <Button
              mr="5px"
              colorScheme="blackAlpha"
              variant="link"
              height="initial"
              fontSize="12px"
              textTransform="none"
              color="black"
              disabled={!enableResendVericationCode}
              onClick={onResendVarificationCodeClick}
              fontWeight="300"
            >
              {frmFields?.ctaResendVerificationLabel}
            </Button>
            &nbsp;
            {counter !== 0 ? (
              <Text
                fontWeight="400"
                fontSize="12px"
                lineHeight="14.06px"
                color="black"
              >
                {timeCounter?.label2}: {counter}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
        </Box>
      ) : (
        <></>
      )}
      <Flex justifyContent="center" width="100%" flexDirection="column">
        {!isValidationMobileClicked ? (
          <Button
            mt="34px"
            textTransform="uppercase"
            isDisabled={!isMobileNumberValid || loading}
            isFullWidth
            onClick={onVerfyMobileNumberValidationClick}
          >
            {frmFields?.buttonCTALabel}
          </Button>
        ) : (
          <Button
            mt="34px"
            textTransform="uppercase"
            onClick={onVerfyMobileNumberContinueClick}
            isFullWidth
            isDisabled={
              !varificationCodeValidated || loading || isVerifyOtpLoading
            }
          >
            {frmFields?.ctaContinueLabel}
          </Button>
        )}
        {/* <Button
          variant="ghost"
          mt="20px"
          onClick={onSkipForNowClick}
          _hover={{ bgColor: "transparent" }}
        >
          <LebaraText
            type="button"
            fontWeight="bold"
            textTransform="uppercase"
            color="secondary.500"
          >
            {frmFields?.ctaSkipLabel}
          </LebaraText>
        </Button> */}
      </Flex>
    </Box>
  );
};

export default VerifyMobileNumber;
