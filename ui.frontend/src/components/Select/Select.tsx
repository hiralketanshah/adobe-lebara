import React from "react";
import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SelectProps } from "./types";

const Select: React.FC<SelectProps> = ({
  options,
  width,
  label,
  formControlBorderRadius,
  ...rest
}) => {
  const lockSelect = options.length < 2;

  return (
    <FormControl
      flexDirection="column"
      gridGap={2.5}
      width={width}
      bg="white"
      borderRadius={formControlBorderRadius}
    >
      {label && (
        <FormLabel color="bodyCopy" fontSize={16} fontWeight="bold">
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        height="49px"
        fontSize="16px"
        fontWeight="bold"
        borderRadius="lg"
        {...rest}
        pointerEvents={lockSelect ? "none" : "auto"}
        iconColor={lockSelect ? "white" : "default"}
      >
        {options.map((option) => (
          <option value={option.value} key={option.key || option.value}>
            {option.name}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select;
