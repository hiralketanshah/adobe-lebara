import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { GoSearch, HiOutlineExclamation } from "react-icons/all";
import { useField } from "formik";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FormikAddressSearchProps } from "./types";
import colors from "../../../theme/colors";

const FormikAddressSearch: React.FC<FormikAddressSearchProps> = ({
  name,
  label,
  placeholder,
  isRequired,
  isDisabled,
}) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  return (
    <FormControl isRequired={isRequired} isInvalid={touchedWithError} flex={1}>
      <FormLabel
        htmlFor={name}
        mb="5px"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="22px"
      >
        {label}
      </FormLabel>
      <Text color="explainerColor" fontSize="12px" mb="14px">
        Key in your postal code and find your address
      </Text>
      <GooglePlacesAutocomplete
        autocompletionRequest={{
          componentRestrictions: {
            country: ["de"],
          },
        }}
        selectProps={{
          isDisabled,
          name,
          components: {
            DropdownIndicator: () => (
              <Box px="16px">
                <GoSearch color="#969696" />
              </Box>
            ),
          },
          styles: {
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
          },
          value: field.value,
          onChange: (value: any) => {
            helpers.setValue(value);
          },
          onBlur: () => {
            // https://github.com/formium/formik/issues/2083#issuecomment-639962222
            setTimeout(() => helpers.setTouched(true), 0);
          },
          placeholder,
        }}
      />
      {hasError && (
        <FormErrorMessage color="unsuccessful">
          <HiOutlineExclamation size={20} color="lebaraRed" />
          <Text paddingLeft="7px" noOfLines={1}>
            {(error as any)?.label ?? error}
          </Text>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormikAddressSearch;
