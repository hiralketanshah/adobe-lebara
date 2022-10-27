import React, { useState, useEffect } from "react";
import { IoChevronDownCircleSharp } from "react-icons/all";
import { LanguageDropDownProps } from "./types";
import Select from "@lebara/core/components/Select/Select";
import { useLocation } from "@lebara/core/hooks/useHistory";

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({
  options,
  selectProps,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation<{}>();
  const handleChange = (event: any) => {
    const { target } = event;
    if (target.type === 'select-one') {
      const selectedValue = target.selectedOptions[0].value;
      window.open(`${selectedValue}${location.search}`, "_self");
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
