import React, { useState } from "react";
import {
  Flex,
  Box,
} from "@chakra-ui/react";
import Select from "react-select";
import Highlighter from "react-highlight-words";
import { FiSearch } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { HelpCenterSearchProps } from "./types";
import aemUtils from "../../utils/aem-utils";
import colors from "../../theme/colors";

function formatOptionLabel({ label }: any, { inputValue }: any) {
  return (
    <Highlighter
      searchWords={[inputValue]}
      textToHighlight={label}
      highlightStyle={{ fontWeight: "bold", backgroundColor: "inherit" }}
    />
  );
}

const HelpCenterSearch: React.FC<HelpCenterSearchProps> = ({
  searchPlaceholder,
  searchRoot,
}) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [searchRootValue] = useState(searchRoot);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchData() {
    const response = await fetch(aemUtils.getSearchResultsPath(query, searchRootValue, 'help'));
    const jsonResp = await response.json();
    
    const newSelectOptionsData = jsonResp && jsonResp?.map((item: any, idx: number) => {

      return {
        ...item,
         value: item?.path, 
         label: item?.title,
      }
    })
    setSearchResults(newSelectOptionsData);
  }

  const handleChange = (option: any) => {
    console.log('handle change', {option});

    if(option && option?.value) {
      history.push(option?.value);
    }
  }

  const onSearchHandler = (e: any) => {
    // console.log('onsearchHandler' , {e});
    
    const { value } = e.target;
    console.log('onsearchHandler' , {value});
    setQuery(value);
    
    if(!value) {
      setSearchResults([]);
    }

    return aemUtils.debounce(() => fetchData());
  };

  return (
    <>
       <Flex
            alignItems={{ base: "flex-start", lg: "center" }}
            justifyContent={{ base: "flex-start", lg: "center" }}
            direction="column">
          <Box w={{ base: "100%", lg: "515px" }}>
              <Select
                className="faq-search"
                id="helpCenterSearch"
                name="helpCenterSearch"
                components={{
                  DropdownIndicator: () => (
                    <Box px="16px">
                      <FiSearch color="#463C3C" />
                    </Box>
                  ),
                }}
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (base: any) => ({
                    ...base,
                    boxShadow: "none",
                    borderColor: colors.greySilver,
                    borderWidth: "0.7px",
                    backgroundColor: "white",
                    marginTop: "25px",
                    minWidth: "100%",
                    borderRadius: "12px",
                    height: "50px",
                  }),
                  indicatorSeparator: (base: any) => ({
                    ...base,
                    display: "none",
                  }),
                  placeholder: (defaultStyles) => ({
                    ...defaultStyles,
                    fontSize: 14,
                    color: colors.grey["200"],
                  }),
                  menu: (provided) => ({
                    ...provided,
                    marginTop: "-7px",
                    border: "0.5px solid #8C8FA2",
                    borderBottomRightRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    fontSize: 14,
                    lineHeight: "30px",
                  }),
                }}
                placeholder={searchPlaceholder}
                getOptionLabel={(t) => t.label}
                options={searchResults}
                onChange={handleChange}
                onKeyDown={onSearchHandler}
                
              />
          </Box>
      </Flex>
    </>
  )
};

export default HelpCenterSearch;
