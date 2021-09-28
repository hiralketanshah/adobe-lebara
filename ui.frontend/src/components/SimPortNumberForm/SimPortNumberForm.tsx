import React, { useState } from "react";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Box,
  Switch,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  BsXCircleFill,
  HiOutlineExclamation,
  MdCheckCircle,
} from "react-icons/all";
import { SimPortNumberFormProps } from "./types";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import {
  DAY_RANGE,
  MONTH_RANGE,
  NUMBER_FIELD_PATTERN,
  DATE_OF_BIRTH_YEAR_RANGE,
} from "../../utils/lebara.constants";
import Select from "../Select/Select";
import { useHistory } from "react-router-dom";

const SimPortNumberForm: React.FC<SimPortNumberFormProps> = ({
  confirm,
  marketting,
  maxLengthMobileNumber,
  multiFieldOptions,
  currentProviderSelectOptions,
  currentProviderDefaultSelectValue,
  consent,
  dataProtectionDeclation,
  onCancel,
  onWillDoItLater,
  title,
  dayFieldErrorMessage,
  monthFieldErrorMessage,
  yearFieldErrorMessage,
  currentProviderErrorMessage,
  mobileNumberErrorMessage,
  mobileNumberMaxLength,
  mobileNumberFieldPattern,
  doitLaterButtonLabel,
  continueButtonLabel,
  cancelbuttonlabel,
  termsAndConditions,
  contractInfo,
  mobileNumberDesc,
  mobileNumberLabel,
  currentProviderDesc,
  currentProviderLabel
}) => {
  const [mobileNoFieldPattern] = useState(NUMBER_FIELD_PATTERN);
  const [dayRange] = useState(DAY_RANGE);
  const [monthRange] = useState(MONTH_RANGE);
  const [yearRange] = useState(DATE_OF_BIRTH_YEAR_RANGE);
  const history = useHistory();

  const validationSchema = yup.object({
    mobileNumber: yup
      .string()
      .max(maxLengthMobileNumber, mobileNumberMaxLength)
      .required(mobileNumberErrorMessage)
      .matches(mobileNoFieldPattern, mobileNumberFieldPattern),
    day: yup
      .string()
      .required(dayFieldErrorMessage)
      .matches(dayRange, dayFieldErrorMessage),
    month: yup
      .string()
      .required(monthFieldErrorMessage)
      .matches(monthRange, monthFieldErrorMessage),
    year: yup
      .string()
      .max(4, yearFieldErrorMessage)
      .required(yearFieldErrorMessage)
      .matches(yearRange, yearFieldErrorMessage),
    currentProvider: yup.string().required(currentProviderErrorMessage),
  });
  const addressCardFormik = useFormik({
    initialValues: {
      mobileNumber: "",
      portInCode: "",
      day: "",
      month: "",
      year: "",
      currentProvider: "",
    },
    validationSchema,
    onSubmit: (values) => {
      history.push("/personal-details", {
        portIn: {
          dob: `${values.month}/${values.day}/${values.year}`,
          msisdn: values.mobileNumber,
          previousProvider: values.currentProvider,
        },
      });
    },
  });
  return (
    <form onSubmit={addressCardFormik.handleSubmit}>
      <Flex
        w="100%"
        flexDirection="column"
        background="white"
        px="15px"
        py="20px"
      >
        <Text
          fontSize="20px"
          lineHeight="1.6"
          fontWeight="bold"
          color="primary.600"
          mb="15px"
        >
          {title}
        </Text>
        <Box mb="20px">
          <FormControl as="fieldset" gridGap={2.5} isRequired>
            {multiFieldOptions?.label && (
              <>
                <FormLabel>
                  <Text
                    color="black"
                    fontSize={16}
                    fontWeight="bold"
                    display="inline"
                  >
                    {multiFieldOptions.label}
                  </Text>
                </FormLabel>
                <Text
                  fontSize={14}
                  fontWeight="normal"
                  mb="15px"
                  color="explainerColor"
                >
                  {multiFieldOptions.explainer}
                </Text>
              </>
            )}
            <HStack spacing={{ base: "12px", md: "24px" }}>
              <InputGroup size="md" width={{ base: "100%", md: "225px" }}>
                <Input
                  id="day"
                  label="Day"
                  fontSize="12px"
                  onChange={addressCardFormik.handleChange}
                  onBlur={addressCardFormik.handleBlur}
                  value={addressCardFormik.values.day}
                  isInvalid={
                    addressCardFormik.touched.day &&
                    Boolean(addressCardFormik.errors.day)
                  }
                  borderColor={
                    addressCardFormik.touched.day &&
                      Boolean(!addressCardFormik.errors.day)
                      ? "lebaraGreen"
                      : "#C8C8C8"
                  }
                  errorBorderColor="unsuccessful"
                />
                <InputRightElement width="3rem" height="initial" top="0.6rem">
                  <Box>
                    {addressCardFormik.touched.day &&
                      Boolean(addressCardFormik.errors.day) ? (
                      <BsXCircleFill size={18} color="#E1001E" />
                    ) : addressCardFormik.touched.day &&
                      Boolean(!addressCardFormik.errors.day) ? (
                      <MdCheckCircle size={18} color="#00C800" />
                    ) : (
                      <></>
                    )}
                  </Box>
                </InputRightElement>
              </InputGroup>
              <InputGroup size="md" width={{ base: "100%", md: "225px" }}>
                <Input
                  id="month"
                  label="Month"
                  fontSize="12px"
                  onChange={addressCardFormik.handleChange}
                  onBlur={addressCardFormik.handleBlur}
                  value={addressCardFormik.values.month}
                  isInvalid={
                    addressCardFormik.touched.month &&
                    Boolean(addressCardFormik.errors.month)
                  }
                  borderColor={
                    addressCardFormik.touched.month &&
                      Boolean(!addressCardFormik.errors.month)
                      ? "lebaraGreen"
                      : "#C8C8C8"
                  }
                  errorBorderColor="unsuccessful"
                />
                <InputRightElement width="3rem" height="initial" top="0.6rem">
                  <Box>
                    {addressCardFormik.touched.month &&
                      Boolean(addressCardFormik.errors.month) ? (
                      <BsXCircleFill size={18} color="#E1001E" />
                    ) : addressCardFormik.touched.month &&
                      Boolean(!addressCardFormik.errors.month) ? (
                      <MdCheckCircle size={18} color="#00C800" />
                    ) : (
                      <></>
                    )}
                  </Box>
                </InputRightElement>
              </InputGroup>
              <InputGroup size="md" width={{ base: "100%", md: "250px" }}>
                <Input
                  id="year"
                  label="Year"
                  fontSize="12px"
                  onChange={addressCardFormik.handleChange}
                  onBlur={addressCardFormik.handleBlur}
                  value={addressCardFormik.values.year}
                  isInvalid={
                    addressCardFormik.touched.year &&
                    Boolean(addressCardFormik.errors.year)
                  }
                  borderColor={
                    addressCardFormik.touched.year &&
                      Boolean(!addressCardFormik.errors.year)
                      ? "lebaraGreen"
                      : "#C8C8C8"
                  }
                  errorBorderColor="unsuccessful"
                />
                <InputRightElement width="3rem" height="initial" top="0.6rem">
                  <Box>
                    {addressCardFormik.touched.year &&
                      Boolean(addressCardFormik.errors.year) ? (
                      <BsXCircleFill size={18} color="#E1001E" />
                    ) : addressCardFormik.touched.year &&
                      Boolean(!addressCardFormik.errors.year) ? (
                      <MdCheckCircle size={18} color="#00C800" />
                    ) : (
                      <></>
                    )}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </HStack>
            {addressCardFormik.touched.day && addressCardFormik.errors.day ? (
              <Box display="flex" alignItems="flex-start" pl="12px" mt="8px">
                <HiOutlineExclamation size={20} color="#E1001E" />
                &nbsp;
                <Text
                  color="unsuccessful"
                  fontWeight="400"
                  fontSize={14}
                  lineHeight="20px"
                >
                  {addressCardFormik.errors.day}
                </Text>
              </Box>
            ) : null}
            {addressCardFormik.touched.month &&
              addressCardFormik.errors.month ? (
              <Box display="flex" alignItems="flex-start" pl="12px" mt="8px">
                <HiOutlineExclamation size={20} color="#E1001E" />
                &nbsp;
                <Text
                  color="unsuccessful"
                  fontWeight="400"
                  fontSize={14}
                  lineHeight="20px"
                >
                  {addressCardFormik.errors.month}
                </Text>
              </Box>
            ) : null}
            {addressCardFormik.touched.year && addressCardFormik.errors.year ? (
              <Box display="flex" alignItems="flex-start" pl="12px" mt="8px">
                <HiOutlineExclamation size={20} color="#E1001E" />
                &nbsp;
                <Text
                  color="unsuccessful"
                  fontWeight="400"
                  fontSize={14}
                  lineHeight="20px"
                >
                  {addressCardFormik.errors.year}
                </Text>
              </Box>
            ) : null}
          </FormControl>
        </Box>
        <Box mb="20px">
          <InputGroup>
            <Input
              label={mobileNumberLabel}
              id="mobileNumber"
              isRequired
              explainer={mobileNumberDesc}
              onChange={addressCardFormik.handleChange}
              onBlur={addressCardFormik.handleBlur}
              value={addressCardFormik.values.mobileNumber}
              isInvalid={
                addressCardFormik.touched.mobileNumber &&
                Boolean(addressCardFormik.errors.mobileNumber)
              }
              borderColor={
                addressCardFormik.touched.mobileNumber &&
                  Boolean(!addressCardFormik.errors.mobileNumber)
                  ? "lebaraGreen"
                  : "#C8C8C8"
              }
              errorBorderColor="unsuccessful"
            />
            <InputRightElement width="3rem" height="initial" top="4.6rem">
              <Box>
                {addressCardFormik.touched.mobileNumber &&
                  Boolean(addressCardFormik.errors.mobileNumber) ? (
                  <BsXCircleFill size={18} color="#E1001E" />
                ) : addressCardFormik.touched.mobileNumber &&
                  Boolean(!addressCardFormik.errors.mobileNumber) ? (
                  <MdCheckCircle size={18} color="#00C800" />
                ) : (
                  <></>
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
          {addressCardFormik.touched.mobileNumber &&
            addressCardFormik.errors.mobileNumber ? (
            <Box display="flex" alignItems="flex-start" pl="12px" mt="8px">
              <HiOutlineExclamation size={20} color="#E1001E" />
              &nbsp;
              <Text
                color="unsuccessful"
                fontWeight="400"
                fontSize={14}
                lineHeight="20px"
              >
                {addressCardFormik.errors.mobileNumber}
              </Text>
            </Box>
          ) : null}
        </Box>
        <Box mb="30px">
          <FormControl isRequired>
            <FormLabel fontSize={16} fontWeight="bold">
              {currentProviderLabel}
            </FormLabel>
            <Text
              fontSize={14}
              fontWeight="normal"
              mb="15px"
              color="explainerColor"
              pr="5px"
            >
              {currentProviderDesc}
            </Text>
            <Select
              id="currentProvider"
              onChange={addressCardFormik.handleChange}
              onBlur={addressCardFormik.handleBlur}
              value={addressCardFormik.values.currentProvider}
              isInvalid={
                addressCardFormik.touched.currentProvider &&
                Boolean(addressCardFormik.errors.currentProvider)
              }
              borderColor={
                addressCardFormik.touched.currentProvider &&
                  Boolean(!addressCardFormik.errors.currentProvider)
                  ? "lebaraGreen"
                  : "#C8C8C8"
              }
              formControlBorderRadius="12px"
              options={currentProviderSelectOptions}
              placeholder={currentProviderDefaultSelectValue}
              _placeholder={{ color: "#969696" }}
              color="greySuccess"
              fontWeight="normal"
              fontSize="14px"
            />
            {addressCardFormik.touched.currentProvider &&
              addressCardFormik.errors.currentProvider ? (
              <Box display="flex" alignItems="flex-start" pl="12px" mt="8px">
                <HiOutlineExclamation size={20} color="#E1001E" />
                &nbsp;
                <Text
                  color="unsuccessful"
                  fontWeight="400"
                  fontSize={14}
                  lineHeight="20px"
                >
                  {addressCardFormik.errors.currentProvider}
                </Text>
              </Box>
            ) : null}
          </FormControl>
        </Box>
        <Box py="10px" borderBottom="1px solid grey">
          <Box pb="10px">
            <Flex direction="row">
              <Switch size="lg" colorScheme="blue" />
              <Text color="explainerColor" fontSize="12px">
                <span dangerouslySetInnerHTML={{ __html: contractInfo || '' }} />
              </Text>
            </Flex>
          </Box>
          <Box border="1px solid grey">
            <Checkbox color="explainerColor" mb="20px" mt="30px" >
              <div dangerouslySetInnerHTML={{ __html: confirm }} />
            </Checkbox>
          </Box>
          <Box>
            <Checkbox color="explainerColor" mb="30px" mt="10px">
              <div dangerouslySetInnerHTML={{ __html: marketting }} />
            </Checkbox>
          </Box>
          <Box>
            <Checkbox color="explainerColor" mb="30px">
              <div dangerouslySetInnerHTML={{ __html: consent }} />
            </Checkbox>
          </Box>
          <Box>
            <Text mb="30px" color="explainerColor" fontSize="12px">
              {dataProtectionDeclation}
            </Text>
          </Box>
        </Box>
        <Box py="10px">
          <></>
        </Box>
        <Box color="explainerColor" fontSize="12px" mt="10px" mb="40px">
          <Text>
            {termsAndConditions}
          </Text>
        </Box>
        <Button
          type="submit"
          disabled={!(addressCardFormik.isValid && addressCardFormik.dirty)}
        >
          {continueButtonLabel}
        </Button>
        <Button variant="outline" my="20px" onClick={onCancel}>
          {cancelbuttonlabel}
        </Button>
        <Button
          variant="link"
          colorScheme="secondary"
          fontSize="16px"
          fontWeight="800"
          onClick={onWillDoItLater}
        >
          {doitLaterButtonLabel}
        </Button>
      </Flex>
    </form>
  );
};

export default SimPortNumberForm;
