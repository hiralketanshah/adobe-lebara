import React from "react";
import {
  FormControl,
  FormLabel,
  Text,
  NumberInput as ChakraNumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { NumberInputProps } from "./types";

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  explainer,
  multiLabel,
  isRequired,
  ...rest
}) => (
  <FormControl flexDirection="column" gridGap={2.5} isRequired={isRequired}>
    {label && (
      <FormLabel>
        <Text color="bodyCopy" fontSize={16} fontWeight="bold" as="span">
          {label}
        </Text>
        {explainer && (
          <Text fontSize={14} fontWeight="normal" mb="20px">
            {explainer}
          </Text>
        )}
      </FormLabel>
    )}
    {multiLabel && (
      <Text fontSize={12} fontWeight="normal" mb="5px">
        {multiLabel}
      </Text>
    )}
    <ChakraNumberInput {...rest}>
      <NumberInputField />
    </ChakraNumberInput>
  </FormControl>
);

export default NumberInput;
