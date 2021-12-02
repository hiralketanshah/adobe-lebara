import React from "react";
import {
  Box,
  InputGroup,
  Input,
  Badge,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch, IoIosClose, MdCancel, FiArrowRight } from "react-icons/all";
import { SearchProps } from "./types";
import Button from "../Button/Button";
import LebaraText from "../LebaraText/LebaraText";

const Search: React.FC<SearchProps> = ({
  mostSearchesFromUsers,
  recentSearches,
  closeLinkText,
  onCloseClick,
  menuTitle1,
  menuTitle2,
  searchPlaceholder,
}) => (
  <>
    <Box
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
            {closeLinkText}
          </Button>
        </Box>
        <Box mt="4px" px="4px" py="15px">
          {menuTitle1 && <LebaraText type="subtitle2" color="white" fontWeight="bold">
            {menuTitle1}
          </LebaraText>}
          <Box mt="7px">
              {recentSearches && recentSearches?.map((keyword: string, idx) => (
                <Badge 
                  key={`rescentsearch-key-${idx}`}
                  variant="subtle" backgroundColor="badgeColor" ml="7px">
                  {/* Need to check for functionality on click of this keywords - need a discussion */}
                  <Box display="inline-flex">
                    <LebaraText type="body2" color="white" fontSize="14px">
                      {keyword}
                    </LebaraText>
                    <IoIosClose size={20} color="white" />
                  </Box>
                </Badge>
              ))}
          </Box>
          <Box mt="15px">
            {menuTitle2 && <LebaraText type="subtitle2" color="white" fontWeight="bold">
              {menuTitle2}
            </LebaraText>}
            <Box>
                {mostSearchesFromUsers && mostSearchesFromUsers?.map((linkItem, idx) => (
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
                    {/* Need to convert this URL/Link component - need a discussion */}
                    <Button
                      variant="ghost"
                      padding="initial"
                      height="initial"
                      color="white"
                      _hover={{ bgColor: "transparent" }}
                    >
                      <LebaraText type="body2">{linkItem?.linkText}</LebaraText>
                    </Button>
                    <FiArrowRight size={20} color="white" />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
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
  </>
);

export default Search;
