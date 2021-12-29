import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  BsXCircleFill,
  HiOutlineExclamation,
  MdCheckCircle,
} from "react-icons/all";
import { useField } from "formik";
import { RouterLink } from "@lebara/ui/src/hooks/useHistory";
import { FormikInputProps } from "./types";

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  labelProps,
  flex,
  placeholder,
  isRequired,
  inputProps,
  validate,
  removeValidation,
  loginButtonLabel,
  exitingUserErrorMsg,
  secondSubscriptionDisplayText,
  children,
  revealInputToggle,
  ignoreValidations,
  isPrepaid,
  hasEmailError
}) => {
  const [field, meta] = useField({
    name,
    validate,
  });
  const { touched, error } = meta;
  const hasError = !!error || hasEmailError;
  const touchedWithError = touched && hasError;
  const touchOrHasValue = touched || !!field.value;

  return (<>
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
            borderColor: hasEmailError ? "warning" : "lebaraRed",
          }}
          _disabled={{
            backgroundColor: "#FCFCFC",
          }}
          isInvalid={touchedWithError}
          placeholder={placeholder}
          errorBorderColor="unsuccessful"
          borderWidth="1.5px"
          borderColor={
            hasEmailError
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
              hasEmailError
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
            {children}
          </InputRightElement>
        )}
        {revealInputToggle && children && (
          <InputRightElement width="4.5rem" mr="10px">
            {children}
          </InputRightElement>
        )}
      </InputGroup>
      {!ignoreValidations && hasError && !hasEmailError && (
        <FormErrorMessage color="unsuccessful" alignItems="flex-start">
          <Icon as={HiOutlineExclamation} color="lebaraRed" w="20px" h="20px" />
          <Text paddingLeft="7px">{error}</Text>
        </FormErrorMessage>
      )}
      {!ignoreValidations && hasError && !isPrepaid && hasEmailError && (
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
              {exitingUserErrorMsg}{" "}
              <RouterLink
                as={RouterLink}
                color="secondary.500"
                to={{
                  pathname: ("/login"),
                  state: {
                    fromPostPaid: true,
                  },
                }}
              >
                {loginButtonLabel}
              </RouterLink>{" "}
              {secondSubscriptionDisplayText}
            </Text>
          </Flex>
        </FormErrorMessage>
      )}
      {!ignoreValidations && hasError && isPrepaid && hasEmailError && (
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
              {exitingUserErrorMsg}{" "}
              <RouterLink
                as={RouterLink}
                color="secondary.500"
                to={{
                  pathname: ("/login"),
                  state: {
                    fromPostPaid: true,
                  },
                }}
              >
                 {loginButtonLabel}
              </RouterLink>
            </Text>
          </Flex>
        </FormErrorMessage>
      )}
    </FormControl>
  </>);
};

export default FormikInput;
