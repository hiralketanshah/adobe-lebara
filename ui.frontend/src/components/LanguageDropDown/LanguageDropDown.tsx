import React from "react";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import { SelectWrapper } from "./LanguageDropDown.styles";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({ options }) => (
  <SelectWrapper
    backgroundColor="white"
    fontWeight={500}
    color="lebaraChambray.600"
    border={0}
    borderRadius={0}
    maxW="120px"
    width="auto"
    icon={<IoChevronDownCircleSharp fill="#BE2075" />}
    placeholder="English"
    options={options}
  />
);

export default LanguageDropDown;
