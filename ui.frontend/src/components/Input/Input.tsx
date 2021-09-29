import React from "react";
import {
  FormControl,
  FormLabel,
  Text,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
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
      </FormLabel>
    )}
    {explainer && (
      <Text fontSize={14} fontWeight="normal" mb="20px" color="explainerColor">
        {explainer}
      </Text>
    )}
    {multiLabel && (
      <Text fontSize={12} fontWeight="normal" mb="5px">
        {multiLabel}
      </Text>
    )}
    <ChakraInput {...rest} rounded="lg" />
  </FormControl>
);

export default Input;
