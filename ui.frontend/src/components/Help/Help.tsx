import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/all";
import { HelpProps } from "./types";

const Help: React.FC<HelpProps> = ({
  sectionTitle1,
  sectionTitle2,
  faqs,
  browseCategories,
  onCategoryClick,
  searchedFaq,
}) => {
  const [show, setShow] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [showFaqs, setShowFaqs] = useState(false);
  const [selectedFaqIndex, setSelectedFaqIndex] = useState(-1);

  useEffect(() => {
    setSelectedFaqIndex(searchedFaq);
    setShowFaqs(true);
  }, [searchedFaq]);

  return (
    <Box>
      <Text
        fontWeight="500"
        fontSize="24px"
        lineHeight="30px"
        letterSpacing="0.25px"
        color="black"
        mt="30px"
      >
        {sectionTitle1}
      </Text>
      <Box
        width="100%"
        bgColor="white"
        border={{ base: "none", lg: "1px solid" }}
        borderColor={{ base: "none", lg: "greySuccess" }}
        borderRadius="8px"
        px="14px"
        mt="20px"
      >
        {faqs?.map((faq, i) => (
          <Box>
            <Flex
              py="23px"
              borderBottom={
                i === faqs.length - 1 ||
                (showFaqs && selectedFaqIndex === faq.id)
                  ? "none"
                  : "0.25px solid black"
              }
              alignItems="center"
              key={faq.id}
            >
              <Text fontSize="16px" lineHeight="22px" letterSpacing="0.5px">
                {faq.title}
              </Text>
              <Box
                ml="auto"
                cursor="pointer"
                onClick={() => {
                  setShowFaqs(selectedFaqIndex === faq.id ? !showFaqs : true);
                  setSelectedFaqIndex(faq.id);
                }}
              >
                {showFaqs && selectedFaqIndex === faq.id ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </Box>
            </Flex>
            {showFaqs && selectedFaqIndex === faq.id && (
              <Box bg="grey.800" padding="16px" mx="-14px">
                <Text fontSize="14px" lineHeight="28px">
                  {faq.description}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Text
        fontWeight="500"
        fontSize="24px"
        lineHeight="30px"
        letterSpacing="0.25px"
        color="black"
        mt="41px"
      >
        {sectionTitle2}
      </Text>
      <Box
        width="100%"
        bgColor="white"
        border={{ base: "none", lg: "1px solid" }}
        borderColor={{ base: "none", lg: "greySuccess" }}
        borderRadius="8px"
        mt="20px"
      >
        {browseCategories?.map((browseCategory, i) => (
          <Box key={`browse-category-${browseCategory.id}`}>
            <Flex
              mx="14px"
              alignItems="center"
              borderBottom={
                i === browseCategories.length - 1 ||
                (show && selectedCategoryIndex === i)
                  ? "none"
                  : "0.25px solid black"
              }
            >
              <Box py="19px">
                <Text
                  fontWeight="500"
                  fontSize="20px"
                  lineHeight="22px"
                  letterSpacing="0.15px"
                  color="lightenPrimary.500"
                >
                  {browseCategory.title}
                </Text>
                <Text
                  fontSize="14px"
                  lineHeight="20px"
                  letterSpacing="0.25px"
                  mt="6px"
                >
                  {browseCategory.description}
                </Text>
              </Box>
              <Box
                ml="auto"
                cursor="pointer"
                onClick={() => {
                  setShow(!show);
                  setSelectedCategoryIndex(i);
                }}
              >
                {show && selectedCategoryIndex === i ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </Box>
            </Flex>
            {show && selectedCategoryIndex === i ? (
              <Box bgColor="grey.800" px="14px">
                {browseCategory.categoryTypes.map((categoryType, j) => (
                  <Flex
                    pl="11px"
                    py="20px"
                    borderBottom={
                      j === browseCategory.categoryTypes.length - 1
                        ? "none"
                        : "0.25px solid black"
                    }
                  >
                    <Text
                      fontSize="16px"
                      lineHeight="22px"
                      letterSpacing="0.5px"
                    >
                      {categoryType}
                    </Text>
                    <Box ml="auto" cursor="pointer">
                      <IoIosArrowForward onClick={onCategoryClick} />
                    </Box>
                  </Flex>
                ))}
              </Box>
            ) : (
              <></>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Help;
