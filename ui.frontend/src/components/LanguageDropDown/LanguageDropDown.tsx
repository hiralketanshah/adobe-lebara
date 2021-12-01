import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import Select from "../Select/Select";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({
  options,
  selectProps,
}) => {
  const history = useHistory();
  const [selectOptions, setSelectOptions] = useState([]);

  const handleChange = (event: any) => {
    const { target } = event;
    if (target.type === 'select-one') {
      const selectedValue = target.selectedOptions[0].value;
      history.push(selectedValue);
    }
  }

  useEffect(() => {
    if(options && options.length) {
      let newSelectOptionsData = [] as  any;
      newSelectOptionsData = options && options?.map((item: any, idx: number) => {
        return {
          name: item?.title,
          value: item?.url,
          key: idx+1
        }
      });

      setSelectOptions(newSelectOptionsData);
    }
  }, [options]);
  
  return (
    <Select
      h="25px"
      fontSize="10px"
      backgroundColor="white"
      fontWeight="medium"
      color="primary.600"
      border={0}
      borderRadius={0}
      maxW="120px"
      iconSize="14px"
      width="auto"
      icon={
        <IoChevronDownCircleSharp fill="#FF3182" width="14px" height="14px" />
      }
      placeholder="English"
      options={selectOptions}
      onChange={handleChange}
      {...selectProps}
    />
  )
};

export default LanguageDropDown;
