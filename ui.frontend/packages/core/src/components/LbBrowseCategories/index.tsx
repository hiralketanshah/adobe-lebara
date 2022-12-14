import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/all";
import { CompProps } from "./types";
import { useHistory } from "@lebara/core/hooks/useHistory";
import "./../../styles/helpcenter.scss";

const LbBrowseCategories: React.FC<CompProps> = ({
  title,
  browseCategoriesLinks,
  onCategoryClick,
}) => {
  const [show, setShow] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const history = useHistory();
  return (
    <Box className="helpcenter-bc">
      {title && <Text
        fontWeight="500"
        fontSize="24px"
        lineHeight="30px"
        letterSpacing="0.25px"
        color="black"
        mt="41px"
      >
        {title}
      </Text>}
      <Box
        width="100%"
        bgColor="white"
        border={{ base: "none", lg: "1px solid" }}
        borderColor={{ base: "none", lg: "greySuccess" }}
        borderRadius="8px"
        mt="20px"
      >
        {browseCategoriesLinks?.map((browseCategory, idx) => (
            <Box key={`browse-category-${idx}`}>
              <Flex
                mx="14px"
                alignItems="center"
                borderBottom={
                  idx === browseCategoriesLinks?.length - 1 ||
                  (show && selectedCategoryIndex === idx)
                    ? "none"
                    : "0.25px solid black"
                }
              >
                <Box py="19px" {...browseCategory?.pageLinks?.parentLinks?.link ?{ cursor:"pointer", onClick:() => history.push(browseCategory?.pageLinks?.parentLinks?.link)} : {}}>
                  <Text
                    fontWeight="500"
                    fontSize="20px"
                    lineHeight="22px"
                    letterSpacing="0.15px"
                    color="lightenPrimary.500"
                  >
                    {browseCategory?.pageLinks?.parentLinks?.label}
                  </Text>
                  <Text
                    fontSize="14px"
                    lineHeight="20px"
                    letterSpacing="0.25px"
                    mt="6px"
                  >
                    {browseCategory?.pageLinks?.parentLinks?.description}
                  </Text>
                </Box>
                {!!browseCategory?.pageLinks?.childLinks?.length && <Box
                  ml="auto"
                  cursor="pointer"
                  onClick={() => {
                    setShow(!show);
                    setSelectedCategoryIndex(idx);
                  }}
                >
                  {show && selectedCategoryIndex === idx ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </Box>}
              </Flex>
              {show && selectedCategoryIndex === idx ? (
                <Box bgColor="grey.800" px="14px">
                  {browseCategory?.pageLinks?.childLinks?.map((childLink, jdx) => (
                    <Flex
                      pl="11px"
                      py="20px"
                      className="helpcenter-bc-childlinks"
                    >
                      <Text
                        fontSize="16px"
                        lineHeight="22px"
                        letterSpacing="0.5px"
                      >
                        {childLink?.label}
                      </Text>
                      <Box ml="auto" cursor="pointer">
                        <IoIosArrowForward onClick={() => history.push(childLink?.link)} />
                      </Box>
                    </Flex>
                  ))}
                </Box>
              ) : (
                <></>
              )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default LbBrowseCategories;
