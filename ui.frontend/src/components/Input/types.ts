import {
  InputProps as ChakraInputProps,
  NumberInputProps as ChakraNumberInputProps,
} from "@chakra-ui/react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  explainer?: string;
  multiLabel?: string;
  fields?: string[];
  eyeIcon?: boolean;
}

export interface NumberInputProps extends ChakraNumberInputProps {
  label?: string;
  explainer?: string;
  multiLabel?: string;
  fields?: string[];
}
