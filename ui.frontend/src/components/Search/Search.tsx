import React, { useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { BsSearch, MdCancel, FiArrowRight } from "react-icons/all";
import {AuthoringUtils} from "@adobe/aem-spa-page-model-manager";
import { SearchProps, SearchResultProps } from "./types";
import Button from "../Button/Button";
import LebaraText from "../LebaraText/LebaraText";
import aemUtils from "../../utils/aem-utils";
import HeaderSearchInput from "./HeaderSearchInput";

const Search: React.FC<SearchProps> = ({
  links,
  closeLinkText,
  onCloseClick,
  mostSearchLabel,
  searchPlaceholder,
  searchRootPagePath,
  emptySearchResultMsg,
  isHeaderSearchInput,
  isHeaderSearchResult,
}) => {
  console.log({links, searchPlaceholder, AuthoringUtils, });
  const isAemEditor = AuthoringUtils.isEditMode();
  const [query, setQuery] = useState('');
  const [searchRootValue] = useState(searchRootPagePath);
  const [searchResults, setSearchResults] = useState([]);
  async function fetchData() {
    const response = await fetch(aemUtils.getSearchResultsPath(query, searchRootValue, ''));
    const jsonResp = await response.json();
    setSearchResults(jsonResp);
  }

  const handleChange = (e: any) => {
    const { value } = e.target;
    setQuery(value);
    
    if(!value) {
      setSearchResults([]);
    }
  }

  const onSearchHandler = aemUtils.debounce(() => fetchData());
  
  const SearchResultComp: React.FC<any> = ({links, query, searchResults, emptySearchResultMsg, }) => (<>
    {/* Need to check for functionality on click of this keywords - need a discussion */}
    {/* {mostSearchLabel && <LebaraText type="subtitle2" color="white" fontWeight="bold">
      {mostSearchLabel}
    </LebaraText>}
    <Box mt="7px">
        {recentSearches && recentSearches?.map((keyword: string, idx) => (
          <Badge 
            key={`rescentsearch-key-${idx}`}
            variant="subtle" backgroundColor="badgeColor" ml="7px">
            <Box display="inline-flex">
              <LebaraText type="body2" color="white" fontSize="14px">
                {keyword}
              </LebaraText>
              <IoIosClose size={20} color="white" />
            </Box>
          </Badge>
        ))}
    </Box> */}

    {/* No search results or query searched! */}
    {query === '' && links?.length !== 0 && (<Box mt="4px" px="4px" py="15px"><Box mt="15px">
      {mostSearchLabel && <LebaraText type="subtitle2" color="white" fontWeight="bold">
        {mostSearchLabel}
      </LebaraText>}
      <Box>
          {links?.map((linkItem: any, idx: any) => (
            <Box
              key={`mostsearch-key-${idx}`}
              _notLast={{ borderBottom: "1px solid white" }}
              pb="9px"
              mt="12px"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              color="white"
            >
              <Link
                variant="ghost"
                padding="initial"
                height="initial"
                color="white"
                _hover={{ bgColor: "transparent" }}
                to={`${linkItem?.link}` || '/'}
              >
                <LebaraText type="body2">{linkItem?.label}</LebaraText>
              </Link>
              <FiArrowRight size={20} color="white" />
            </Box>
          ))}
      </Box>
    </Box></Box>)}

    {/* If search results found  */}
     {searchResults?.length !== 0 && (<Box mt="4px" px="4px" py="15px"><Box>
        {searchResults?.map((result: SearchResultProps, idx:number) => (
          <Box
            key={`mostsearch-key-${idx}`}
            _notLast={{ borderBottom: "1px solid white" }}
            pb="9px"
            mt="12px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            color="white"
          >
            <Link
              variant="ghost"
              padding="initial"
              height="initial"
              color="white"
              _hover={{ bgColor: "transparent" }}
              to={`${result?.path}` || '/'}
            >
              <LebaraText type="body2">{result?.title}</LebaraText>
            </Link>
            <FiArrowRight size={20} color="white" />
          </Box>
        ))}
    </Box>
    </Box>)}

    {/* If not search results found */}
    {!searchResults.length && (<Box mt="4px" px="4px" py="0">
        <Box
          m={0}
          p={0}
          textAlign="center"
        >{emptySearchResultMsg || "no results found"}</Box>
      </Box>)}
  </>);


  return (
    <>
      {isHeaderSearchInput && <HeaderSearchInput
        searchPlaceholder={searchPlaceholder}
        handleChange={handleChange}
        onSearchHandler={onSearchHandler}
       />}

      {!isHeaderSearchInput && <><Box
        className={'header-search-feature'}
        bgColor="lightenPrimary.500"
        px="20px"
        py={{ base: "15px", md: "initial" }}
        height="max-content"
        width={{ base: "100%", md: "initial" }}
      >
        <Box bgColor="lightenPrimary.500" width="100%" height="max-content">
          <Box
            display={{ md: !isAemEditor ? "none" : "block", base: "flex" }}
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
                onChange={handleChange}
                onKeyUp={onSearchHandler}
              />
            </InputGroup>
            <Box width="10px">
              <> </>
            </Box>
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
              {closeLinkText || 'Close'}
            </Button>
          </Box>
          
          <SearchResultComp 
            query={query}
            links={links}
            searchResults={searchResults}
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

      {isHeaderSearchInput && isHeaderSearchResult && (<Box
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
          <SearchResultComp 
            query={query}
            authoredLinks={links}
            searchResults={searchResults}
            emptySearchResultMsg={emptySearchResultMsg}
          />
        </Box>
      </Box>)}

      
    </>
  )
};

export default Search;
