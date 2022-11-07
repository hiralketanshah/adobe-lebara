import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash, HiOutlineExclamation } from "react-icons/all";
import { useField } from "formik";
import { FormikPasswordProps } from "./types";
import Button from "@lebara/core/components/Button/Button";

const FormikPassword: React.FC<FormikPasswordProps> = ({
  name,
  label,
  labelProps,
  flex,
  isRequired,
  inputProps,
  validate,
  isShowHide,
  isShowHideButton,
  showPasswordLabel,
  hidePasswordLabel
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({
    name,
    validate,
  });
  const showPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  const touchOrHasValue = touched || !!field.value;
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
          type={showPassword ? "text" : "password"}
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
            borderColor: "lebaraRed",
          }}
          _disabled={{
            backgroundColor: "#FCFCFC",
          }}
          isInvalid={touchedWithError}
          errorBorderColor="unsuccessful"
          borderWidth="1.5px"
          borderColor={
            touchedWithError
              ? "lebaraRed"
              : touched
              ? "lebaraGreen"
              : "greySilver"
          }
          {...field}
        />
        {isShowHide && (
          <InputRightElement color="greySuccess" w="47px">
            <Box>
              {!showPassword ? (
                <BsEyeSlash size={17} onClick={showPasswordChange} />
              ) : (
                <BsEye size={17} onClick={showPasswordChange} />
              )}
            </Box>
          </InputRightElement>
        )}
        {isShowHideButton && (
          <InputRightElement color="greySuccess" w="47px">
            <Box mt="11px">
              <InputRightElement width="4.5rem" mr="10px">
                <Button
                  _active={{
                    backgroundColor: "transparent",
                  }}
                  _focus={{
                    outline: 0,
                  }}
                  size="sm"
                  onClick={showPasswordChange}
                  height="initial"
                  variant="ghost"
                  color="secondary.500"
                  _hover={{
                    backgroundColor: "inherit",
                  }}
                >
                  {showPassword ? hidePasswordLabel : showPasswordLabel}
                </Button>
              </InputRightElement>{" "}
            </Box>
          </InputRightElement>
        )}
      </InputGroup>
      {hasError && (
        <FormErrorMessage color="unsuccessful" alignItems="flex-start">
          <Icon as={HiOutlineExclamation} color="lebaraRed" w="20px" h="20px" />
          <Text paddingLeft="7px">{error}</Text>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormikPassword;
