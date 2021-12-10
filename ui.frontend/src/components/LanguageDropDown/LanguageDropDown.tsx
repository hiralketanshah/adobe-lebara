import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import Select from "@lebara/ui/src/components/Select/Select";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({
  options,
  selectProps,
}) => {
  const history = useHistory();
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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

        if(item?.active) {
          setSelectedValue(item?.url);
        }
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
      value={selectedValue}
      defaultValue={selectedValue}
      icon={
        <IoChevronDownCircleSharp fill="#FF3182" width="14px" height="14px" />
      }
      options={selectOptions}
      onChange={handleChange}
      {...selectProps}
    />
  )
};

export default LanguageDropDown;
