import React from "react";
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Text,
  Flex,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { HiOutlineExclamation } from "react-icons/all";
import { useField } from "formik";
import { FormikRadioGroupProps } from "./types";

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  name,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const hasError = !!error;
  const touchedWithError = touched && hasError;
  return (
    <FormControl isInvalid={touchedWithError}>
      <InputGroup size="lg">
        <RadioGroup
          value={field.value}
          onBlur={field.onBlur}
          onChange={(nextValue) => helpers.setValue(nextValue)}
        >
          <Flex gridGap="18px" direction="column">
            {options.map((t) => (
              <Radio
                colorScheme="lightenPrimary"
                key={t.value}
                name={name}
                value={t.value}
              >
                <Text color="primary.800" fontSize={16} ml="1px">
                  {t.label}
                </Text>
              </Radio>
            ))}
          </Flex>
        </RadioGroup>
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

export default FormikRadioGroup;
