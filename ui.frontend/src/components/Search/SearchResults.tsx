import React from "react";
import {
  Box,
} from "@chakra-ui/react";
import { FiArrowRight, MdCancel } from "react-icons/all";
import LebaraText from "../LebaraText/LebaraText";
import { SearchResultProps } from "./types";
import Button from "../Button/Button";
import { RouterLink } from "@lebara/ui/src/hooks/useHistory";
import { MIN_CHARS_SEARCH } from "./search.constant";

const SearchResults: React.FC<any> = ({
    mostSearchLabel,
    links, 
    queryVal, 
    results, 
    emptySearchResultMsg, 
    onCloseClick,
    closeLinkText,
  }) => {
    
    return (<>
      <Box
        className="search-results-feature"
        bgColor="lightenPrimary.500"
        px={{ base: "4px", md: "20px" }}
        py={{ base: "0", md: "inital" }}
        height={{base: '100%', md: results?.length > 5 ? '315' : 'max-content'}}
        overflowY="auto"
        width={{ base: "100%", md: "initial" }}
      >
        <Box bgColor="lightenPrimary.500" width="100%" height="max-content">
          
          {/* Need to check for functionality on click of this keywords - need a discussion */}
          {/* {recentSearchLabel && <LebaraText type="subtitle2" color="white" fontWeight="bold">
            {recentSearchLabel}
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

          {/* No search results or queryVal searched! */}
          {(queryVal === '' || queryVal.length < MIN_CHARS_SEARCH) && results?.length === 0 && links?.length !== 0 && (<Box mt="4px" px="4px" py="15px">
              <Box mt="7px">
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
                      <RouterLink
                        variant="ghost"
                        padding="initial"
                        height="initial"
                        color="white"
                        _hover={{ bgColor: "transparent" }}
                        to={`${linkItem?.link}` || '/'}
                        style={{display: 'block', width: '100%'}}
                      >
                        <LebaraText type="body2">{linkItem?.label}</LebaraText>
                      </RouterLink>
                      <FiArrowRight size={20} color="white" />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>)}

          {/* If search results found  */}
            {queryVal !== '' && results?.length !== 0 && (
            <Box mt="7px" px="4px"
              className="queryvalue-and-search-result">
              <Box>
              {results?.map((result: SearchResultProps, idx:number) => (
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
                  <RouterLink
                    variant="ghost"
                    padding="initial"
                    height="initial"
                    color="white"
                    _hover={{ bgColor: "transparent" }}
                    to={`${result?.path}` || '/'}
                    style={{display: 'block', width: '100%'}}
                  >
                    <LebaraText type="body2">{result?.title}</LebaraText>
                  </RouterLink>
                  <FiArrowRight size={20} color="white" />
                </Box>
              ))}
          </Box>
            </Box>)}

          {/* If not search results found */}
          {queryVal.length >= MIN_CHARS_SEARCH && results.length === 0 && (<Box mt="4px" px="4px" py="4"
            textAlign="center"
            color="white"
            fontSize="14px"
            lineHeight="20px"
            fontWeight="500"
            >
            {emptySearchResultMsg}
            </Box>)}
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
    </>);
}

export default SearchResults;