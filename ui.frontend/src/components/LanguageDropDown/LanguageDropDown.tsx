import React from "react";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import Select from "../Select/Select";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({
  options,
  selectProps,
}) => (
  <Select
    backgroundColor="white"
    fontWeight="medium"
    color="lebaraChambray.600"
    border={0}
    borderRadius={0}
    maxW="120px"
    width="auto"
    icon={<IoChevronDownCircleSharp fill="#BE2075" />}
    placeholder="English"
    options={options}
    {...selectProps}
  />
);

export default LanguageDropDown;
