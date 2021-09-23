import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/all";
import { InputProps } from "./types";
import Button from "../Button/Button";
import Input from "./Input";
import IconButton from "../IconButton/IconButton";

const PasswordInput: React.FC<InputProps> = ({
  label,
  isRequired,
  eyeIcon,
  ...props
}) => {
  const { value, mb } = props;
  const [inputValue, setInputValue] = useState(value ?? "");
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = () => setIsHidden(!isHidden);

  return (
    <FormControl flexDirection="column" gridGap={2.5} isRequired={isRequired}>
      {label && (
        <FormLabel color="bodyCopy" fontSize={16} fontWeight="bold">
          {label}
        </FormLabel>
      )}
      <InputGroup size="md">
        <Input
          bg="white"
          height={45}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
          rounded="lg"
          mb={mb}
          type={isHidden ? "password" : "text"}
        />
        <InputRightElement width="4.5rem">
          {!eyeIcon && (
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              colorScheme="pink"
            >
              {isHidden ? "Show" : "Hide"}
            </Button>
          )}
          {eyeIcon && (
            <IconButton
              icon={isHidden ? <BsEyeFill /> : <BsEyeSlashFill />}
              h="42px"
              w="42px"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              aria-label="eye"
            />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
