import React from "react";
import { Flex, Image, Text, Box } from "@chakra-ui/react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import LebaraText from "../LebaraText/LebaraText";
import { NUMBER_FIELD_PATTERN } from "../../utils/lebara.constants";
import VerifyMobile from "../../assets/images/AttachSimMobile.png";
import { VerifyRegisterProps } from "./types";

const VerifyRegisterMobileNumber: React.FC<VerifyRegisterProps> = ({
  heading,
  subHeading,
  frmFields,
  validationMessages,
}) => {
  // const userToken = useSelector((state: ReduxState) => state.user.token);
  const userToken = "Saurabh.Paul@lebara.com";
  const [updatedMobileNumber, setUpdatedMobileNumber] = React.useState("");
  const [isMobileNumberValid, setIsMobileNumberValid] = React.useState(false);
  
  const onChangeMobileNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInputMobileNumber = event.target.value;
    setUpdatedMobileNumber(userInputMobileNumber);
    setIsMobileNumberValid(
      NUMBER_FIELD_PATTERN.test(userInputMobileNumber) &&
        userInputMobileNumber.length >= 10 &&
        userInputMobileNumber.length <= 12
    );
  };

  const onVerfyMobileNumberClick = () => {};
  const onSkipForNowClick = () => {};

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
          fontWeight="900"
          fontSize="22px"
          lineHeight="40px"
          color="primary.800"
        >
          {heading}
        </Text>}
        {subHeading && <Text
          fontSize="20px"
          lineHeight="22px"
          color="bodyCopy"
          textAlign="center"
          fontWeight="500"
        >
          {subHeading}
        </Text>}
      </Flex>
      <Box mt="23px">
        <Input
          label="Email Address"
          bgColor="grey.50"
          isDisabled
          value={userToken}
          height="45px"
        />
      </Box>
      <Box mt="23px">
        <Input
          label="Lebara Mobile Number"
          value={updatedMobileNumber}
          onChange={onChangeMobileNumber}
          fontWeight="bold"
          height="45px"
        />
      </Box>
      <Flex
        justifyContent="center"
        width={{ base: "100%", md: "335px" }}
        textTransform="uppercase"
        flexDirection="column"
      >
        <Button
          mt="34px"
          isDisabled={!isMobileNumberValid}
          onClick={onVerfyMobileNumberClick}
        >
          {frmFields.buttonCTALabel}
        </Button>
        <Button
          variant="ghost"
          mt="20px"
          onClick={onSkipForNowClick}
          _hover={{ bgColor: "tratransparentns" }}
        >
          <LebaraText
            type="button"
            fontWeight="bold"
            textTransform="uppercase"
            color="secondary.500"
          >
            {frmFields.ctaSkipLabel}
          </LebaraText>
        </Button>
      </Flex>
    </Box>
  );
};

export default VerifyRegisterMobileNumber;
