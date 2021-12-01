import React from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/all";
import { HeaderSearchInputProps } from "./types";

const HeaderSearchInput: React.FC<HeaderSearchInputProps> = ({
  searchPlaceholder,
  onSearchHandler,
  handleChange,
}) => {
  
  return (<>
    <InputGroup
      borderRadius="lg"
      ml="4%"
      width={{ md: "auto", lg: "18rem" }}
    >
      <InputLeftElement
        pointerEvents="none"
        backgroundColor="white"
        borderRadius="lg"
        ml="5px"
      >
        <BsSearch color="#969696" size={20} />
        <Box color="black" pl="4px">
          {" "}
          |{" "}
        </Box>
      </InputLeftElement>
      <Input
        ml="4px"
        name="gsearch"
        placeholder={searchPlaceholder}
        _placeholder={{
          color: "grey.100",
          fontSize: "16px",
          lineHeight: "19px",
          letterSpacing: "0.25px",
        }}
        color="black"
        bgColor="white"
        borderRadius="lg"
        onChange={handleChange}
        onKeyUp={onSearchHandler}
      />
    </InputGroup>
  </>)
};

export default HeaderSearchInput;
