import React from "react";
import {
  FormControl,
  FormLabel,
  Switch as ChakraSwitch,
} from "@chakra-ui/react";
import { SwitchProps } from "./types";

const Switch: React.FC<SwitchProps> = ({ name, label, ...rest }) => (
  <FormControl
    display="flex"
    alignItems="center"
    w="100%"
    justifyContent="space-between"
  >
    {label && (
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
    )}
    <ChakraSwitch
      id={name}
      colorScheme="secondary"
      {...rest}
      width="40px"
      height="20xp"
      sx={{
        "--slider-track-width": "36px",
        "--slider-track-height": "16px",
      }}
    />
  </FormControl>
);

export default Switch;
