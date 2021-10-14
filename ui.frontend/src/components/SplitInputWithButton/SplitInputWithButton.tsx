import React from "react";
import { InputGroup } from "@chakra-ui/react";
import { SplitInputWithButtonProps } from "./types";
import Input from "../Input/Input";
import Button from "../Button/Button";

const SplitInputWithButton: React.FC<SplitInputWithButtonProps> = ({
  buttonProps,
  onClick,
  isDisabled,
  buttonLabel,
  ...rest
}) => (
  <InputGroup size="md">
    <Input {...rest} borderRightRadius={0} borderRightWidth={0} />
    <Button
      {...buttonProps}
      borderLeftRadius={0}
      isDisabled={isDisabled}
      onClick={onClick}
      height="40px"
    >
      {buttonLabel}
    </Button>
  </InputGroup>
);

export default SplitInputWithButton;
