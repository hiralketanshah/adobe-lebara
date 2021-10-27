import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  BsXCircleFill,
  HiOutlineExclamation,
  MdCheckCircle,
} from "react-icons/all";
import { useField } from "formik";
import { Link as ReachLink } from "react-router-dom";
import { FormikInputProps } from "./types";
import { globalConstants as GC } from  '../../../GlobalConfigs.js';

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  labelProps,
  flex,
  placeholder,
  isRequired,
  inputProps,
  validate,
  loginButtonLabel,
  exitingUserErrorMsg,
  secondSubscriptionDisplayText,
}) => {
  const [field, meta] = useField({
    name,
    validate,
  });
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  const touchOrHasValue = touched || !!field.value;
  const isExistingUser = error === "exists";
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={touchedWithError}
      flex={flex}
    >
      <FormLabel
        htmlFor={name}
        mb="10px"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="22px"
        {...labelProps}
      >
        {label}
      </FormLabel>
      <InputGroup size="md">
        <Input
          id={name}
          {...inputProps}
          paddingRight={touchOrHasValue ? "47px" : undefined}
          backgroundColor={!field.value ? "#FCFCFC" : "white"}
          fontSize={14}
          _focus={{
            borderColor: "darkTurquoise",
            boxShadow: "none",
          }}
          _invalid={{
            boxShadow: "none",
            borderColor: isExistingUser ? "warning" : "lebaraRed",
          }}
          isInvalid={touchedWithError}
          placeholder={placeholder}
          errorBorderColor="unsuccessful"
          borderWidth="1.5px"
          borderColor={
            isExistingUser
              ? "warning"
              : touchedWithError
              ? "lebaraRed"
              : touched
              ? "lebaraGreen"
              : "greySilver"
          }
          {...field}
        />
        {touchOrHasValue && (
          <InputRightElement
            color={
              isExistingUser
                ? "warning"
                : touchedWithError
                ? "lebaraRed"
                : "lebaraGreen"
            }
            w="47px"
          >
            <Box>
              {error ? (
                <BsXCircleFill size={17} />
              ) : (
                <MdCheckCircle size={17} />
              )}
            </Box>
          </InputRightElement>
        )}
      </InputGroup>
      {hasError && !isExistingUser && (
        <FormErrorMessage color="unsuccessful">
          <HiOutlineExclamation size={20} color="lebaraRed" />
          <Text paddingLeft="7px" noOfLines={1}>
            {error}
          </Text>
        </FormErrorMessage>
      )}
      {hasError && isExistingUser && (
        <FormErrorMessage color="warning">
          <Flex>
            <Box w="20px">
              <HiOutlineExclamation size={20} color="warning" />
            </Box>
            <Text
              color="black"
              paddingLeft="7px"
              fontSize={14}
              lineHeight="17.1px"
              letterSpacing="0.23px"
            >
              {exitingUserErrorMsg}{" "}
              <Link
                as={ReachLink}
                color="secondary.500"
                to={{
                  pathname: `/${GC.LOGIN}`,
                  state: {
                    fromPostPaid: true,
                  },
                }}
              >
                {loginButtonLabel}
              </Link>{" "}
              {secondSubscriptionDisplayText}
            </Text>
          </Flex>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormikInput;
