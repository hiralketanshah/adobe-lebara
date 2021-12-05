import React from "react";
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Text,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineExclamation } from "react-icons/all";
import { Field, useField } from "formik";
import { FormikCheckboxProps } from "./types";
import styles from "./Checkbox.module.css";
import LebaraText from "../../LebaraText/LebaraText";

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ 
  name, 
  isValidated,
  children,
}) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  return (
    <FormControl isInvalid={touchedWithError} width="initial">
      <InputGroup size="lg" alignItems="center">
        {isValidated ? (
          <>
            <Field
              type="checkbox"
              defaultChecked={field.value}
              name={name}
              marginTop="2px"
              size="medium"
              alignItems="center"
            />
            <LebaraText
              type="formLabel"
              color="lightenPrimary"
              ml="8px"
              fontWeight="normal"
              fontSize="14px"
            >
              {children}
            </LebaraText>
          </>
        ) : (
          <>
            <Checkbox
              defaultChecked={field.value}
              className={styles.checkbox}
              marginTop="2px"
              alignItems="center"
              colorScheme="lightenPrimary"
              {...field}
            >
              {children}
            </Checkbox>
          </>
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

export default FormikCheckbox;
