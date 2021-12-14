import React, { useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch, MdCancel } from "react-icons/all";
import { SearchProps } from "./types";
import Button from "../Button/Button";
import aemUtils from "../../utils/aem-utils";
import SearchResults from "./SearchResults";

const Search: React.FC<SearchProps> = ({
  links,
  onCloseClick,
  closeLinkText = "Close",
  recentSearchLabel = "Your recent searches",
  mostSearchLabel = "Most searched from users",
  searchPlaceholder = "Search here",
  emptySearchResultMsg = "no results found",
  searchRoot,
  isHeaderSearchInput,
  showSearchResults,
  onHandleSearchQuery,
  searchValue = '',
}) => {
  const [query, setQuery] = useState('');
  const [searchRootValue] = useState(searchRoot);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchData() {
    const response = await fetch(aemUtils.getSearchResultsPath(query, searchRootValue, ''));
    const jsonResp = await response.json();
    setSearchResults(jsonResp);
  }

  const handleChange = (e: any) => {
    const { value } = e.target;
    // console.log('handle change' , value);
    setQuery(value);
    
    onHandleSearchQuery && onHandleSearchQuery({
      isQuery: value,
      results: [...searchResults]
    });

    if(!value) {
      setSearchResults([]);
      onHandleSearchQuery && onHandleSearchQuery({
        isQuery: value,
        results: [...searchResults]
      });
    }
  }

  const onSearchHandler = aemUtils.debounce(() => fetchData());

  // console.log(searchResults);

  return (
    <>
       {isHeaderSearchInput && !showSearchResults && (<>
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
              defaultValue={searchValue}
              onChange={handleChange}
              onKeyUp={onSearchHandler}
              autoFocus={true}
            />
          </InputGroup>
        </>)}

      {/* For Desktop/Default View Search field and Result output! */}
      {showSearchResults && (<>
        <SearchResults
            key={query}
            mostSearchLabel={mostSearchLabel}
            queryVal={query}
            links={links}
            results={searchResults}
            emptySearchResultMsg={emptySearchResultMsg}
            onCloseClick={onCloseClick}
            closeLinkText={closeLinkText}
          />
      </>
      )}

      {/* For Mobile View Search field and Result output! */}
      {!isHeaderSearchInput && !showSearchResults && <><Box
        className={'header-search-feature'}
        bgColor="lightenPrimary.500"
        px="20px"
        py={{ base: "15px", md: "initial" }}
        height="max-content"
        width={{ base: "100%", md: "initial" }}
      >
        <Box bgColor="lightenPrimary.500" width="100%" height="max-content">
          <Box
            display={{ md: "none", base: "flex" }}
            justifyContent="space-between"
            borderRadius="lg"
          >
            <InputGroup borderRadius="lg">
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
                value={query}
                onChange={handleChange}
                onKeyUp={onSearchHandler}
              />
            </InputGroup>
            <Box width="10px" />
            <Button
              display={{ base: "inline-block", md: "none" }}
              textTransform="capitalize"
              color="white"
              p="initial"
              variant="ghost"
              fontSize="14px"
              lineHeight="20px"
              fontWeight="500"
              onClick={onCloseClick}
            >
              {closeLinkText}
            </Button>
          </Box>
          
          <SearchResults
            key={query}
            mostSearchLabel={mostSearchLabel}
            queryVal={query}
            links={links}
            results={searchResults}
            emptySearchResultMsg={emptySearchResultMsg}
          />
        </Box>
      </Box>
      
      <Box display={{ base: "none", md: "table" }} mt="7px" margin="0 auto">
        <Button
          variant="ghost"
          padding="initial"
          height="initial"
          color="white"
          _hover={{ bgColor: "transparent" }}
          onClick={onCloseClick}
        >
          <MdCancel size={20} color="#00A6EB" />
        </Button>
      </Box>
      </>}
      
    </>
  )
};

export default Search;
