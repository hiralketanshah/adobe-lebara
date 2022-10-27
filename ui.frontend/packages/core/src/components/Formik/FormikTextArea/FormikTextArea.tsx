import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Textarea,
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
import { FormikTextAreaProps } from "./types";

const FormikTextArea: React.FC<FormikTextAreaProps> = ({
  name,
  label,
  labelProps,
  flex,
  placeholder,
  isRequired,
  validate,
  removeValidation,
  ignoreValidations,
  isPrepaid,
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
        <Textarea
          id={name}
          paddingRight={touchOrHasValue ? "47px" : undefined}
          backgroundColor={!field.value ? "#FCFCFC" : "white"}
          fontSize={14}
          resize="none"
          _focus={{
            borderColor: "darkTurquoise",
            boxShadow: "none",
          }}
          _invalid={{
            boxShadow: "none",
            borderColor: isExistingUser ? "warning" : "lebaraRed",
          }}
          _disabled={{
            backgroundColor: "#FCFCFC",
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
            {!removeValidation ? (
              <Box>
                {error ? (
                  <BsXCircleFill size={17} />
                ) : (
                  <MdCheckCircle size={17} />
                )}
              </Box>
            ) : (
              <></>
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {!ignoreValidations && hasError && !isExistingUser && (
        <FormErrorMessage color="unsuccessful" alignItems="flex-start">
          <Icon as={HiOutlineExclamation} color="lebaraRed" w="20px" h="20px" />
          <Text paddingLeft="7px">{error}</Text>
        </FormErrorMessage>
      )}
      {!ignoreValidations && hasError && !isPrepaid && isExistingUser && (
        <FormErrorMessage color="warning" alignItems="flex-start">
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
              This email address is already registered with us.{" "}
              <Link
                as={ReachLink}
                color="secondary.500"
                to={{
                  pathname: "/login",
                  state: {
                    fromPostPaid: true,
                  },
                }}
              >
                Login
              </Link>{" "}
              to manage/upgrade your plan. If you would like to order a second
              subscription, please use a different email address.
            </Text>
          </Flex>
        </FormErrorMessage>
      )}
      {!ignoreValidations && hasError && isPrepaid && isExistingUser && (
        <FormErrorMessage color="warning" alignItems="flex-start">
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
              This email address is already registered with us. Please{" "}
              <Link
                as={ReachLink}
                color="secondary.500"
                to={{
                  pathname: "/login",
                  state: {
                    fromPrepaid: true,
                  },
                }}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormikTextArea;
