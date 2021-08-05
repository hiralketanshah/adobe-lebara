import React from "react";
import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SelectProps } from "./types";
import lebaraColor from "../../color";

const Select: React.FC<SelectProps> = ({ options, width, label, ...rest }) => {
  const lockSelect = options.length < 2;
  return (
    <FormControl flexDirection="column" gridGap={2.5} width={width}>
      {label && (
        <FormLabel color="bodyCopy" fontSize={16} fontWeight="bold">
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        fontSize="16px"
        fontWeight={500}
        background="white"
        borderRadius="lg"
        {...rest}
        pointerEvents={lockSelect ? "none" : "auto"}
        iconColor={lockSelect ? "white" : "default"}
      >
        {options.map((option) => (
          <option value={option.value} key={option.key}>
            {option.name}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select;
