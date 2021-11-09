import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, HiOutlineExclamation } from "react-icons/all";
import { useField } from "formik";
import Select from "react-select";
import { FormikSelectProps } from "./types";
import colors from "../../../theme/colors";

const FormikSelect: React.FC<FormikSelectProps> = ({
  name,
  label,
  labelProps,
  placeholder,
  flex,
  isRequired,
  options,
  helperText,
  isDisabled,
}) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={touchedWithError}
      flex={flex}
    >
      <FormLabel
        htmlFor={name}
        mb={helperText ? "4px" : "10px"}
        fontWeight="bold"
        fontSize="14px"
        lineHeight="22px"
        {...labelProps}
      >
        {label}
      </FormLabel>
      {helperText && (
        <Text
          mb="10px"
          color="explainerColor"
          fontSize={{ base: "12px", lg: "14px" }}
          lineHeight="20px"
        >
          {helperText}
        </Text>
      )}
      <Select
        isDisabled={isDisabled}
        id={name}
        components={{
          DropdownIndicator: () => (
            <Box px="16px">
              <FiChevronDown color="#463C3C" />
            </Box>
          ),
        }}
        onBlur={() => {
          // https://github.com/formium/formik/issues/2083#issuecomment-639962222
          setTimeout(() => helpers.setTouched(true));
        }}
        onChange={(newValue) => helpers.setValue(newValue?.value)}
        styles={{
          control: (base: any, state: any) => ({
            ...base,
            boxShadow: "none",
            borderColor: state.isFocused
              ? colors.darkTurquoise
              : touchedWithError
              ? colors.lebaraRed
              : touched
              ? colors.lebaraGreen
              : colors.greySilver,
            borderWidth: "1.5px",
            backgroundColor: !field.value ? "#FCFCFC" : "white",
          }),
          indicatorSeparator: (base: any) => ({
            ...base,
            display: "none",
          }),
          placeholder: (defaultStyles) => ({
            ...defaultStyles,
            fontSize: 14,
            color: colors.grey["200"],
          }),
        }}
        placeholder={placeholder}
        getOptionLabel={(t) => t.name}
        options={options}
      />
      {hasError && (
        <FormErrorMessage color="unsuccessful">
          <HiOutlineExclamation size={20} color="lebaraRed" />
          <Text paddingLeft="7px" noOfLines={1}>
            {error}
          </Text>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
export default FormikSelect;
