import React from "react";
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { HiOutlineExclamation } from "react-icons/all";
import { useField } from "formik";
import { FormikCheckboxProps } from "./types";
import styles from "./Checkbox.module.css";

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, children }) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  return (
    <FormControl isInvalid={touchedWithError}>
      <InputGroup size="lg">
        <Checkbox
          className={styles.checkbox}
          marginTop="2px"
          alignItems="unset"
          colorScheme="lightenPrimary"
          {...field}
        >
          {children}
        </Checkbox>
      </InputGroup>
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

export default FormikCheckbox;
