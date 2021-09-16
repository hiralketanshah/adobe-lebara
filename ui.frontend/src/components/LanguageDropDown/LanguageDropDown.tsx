import React from "react";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import Select from "../Select/Select";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({
  options,
  selectProps,
}) => (
  <Select
    h="25px"
    fontSize="10px"
    backgroundColor="white"
    fontWeight="medium"
    color="lightenPrimary.600"
    border={0}
    borderRadius={0}
    maxW="120px"
    iconSize="14px"
    width="auto"
    icon={
      <IoChevronDownCircleSharp fill="#BE2075" width="14px" height="14px" />
    }
    placeholder="English"
    options={options}
    {...selectProps}
  />
);

export default LanguageDropDown;
