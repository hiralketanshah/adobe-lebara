import { SelectProps as ChakraSelectProps } from "@chakra-ui/react";

export interface SelectProps extends ChakraSelectProps {
  options: SelectOption[];
  label?: string;
}

export interface SelectOption {
  value: string;
  name: string;
  key: number;
}
