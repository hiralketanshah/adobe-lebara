import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/all";
import { CompProps } from "./types";

const LbFAQ: React.FC<CompProps> = ({
  title,
  readMoreLabel,
  faqPages,
  searchedFaq,
}) => {
  const [showFaqs, setShowFaqs] = useState(false);
  const [selectedFaqIndex, setSelectedFaqIndex] = useState(-1);

  useEffect(() => {
    setSelectedFaqIndex(searchedFaq);
    setShowFaqs(true);
  }, [searchedFaq]);

  return (
    <Box className="helpcenter-fq">
      {title && <Text
        fontWeight="500"
        fontSize="24px"
        lineHeight="30px"
        letterSpacing="0.25px"
        color="black"
        mt="30px"
      >
        {title}
      </Text>}
      <Box
        width="100%"
        bgColor="white"
        border={{ base: "none", lg: "1px solid" }}
        borderColor={{ base: "none", lg: "greySuccess" }}
        borderRadius="8px"
        px="14px"
        mt="20px"
      >
        {faqPages?.map((faq, i) => {
          const idx = i+1;
          return (
            <Box>
              <Flex
                py="23px"
                className="helpcenter-fq-list-item"
                alignItems="center"
                key={`faq-wrap`+idx}
              >
                <Text fontSize="16px" lineHeight="22px" letterSpacing="0.5px">
                  {faq?.title}
                </Text>
                <Box
                  ml="auto"
                  cursor="pointer"
                  onClick={() => {
                    setShowFaqs(selectedFaqIndex === idx ? !showFaqs : true);
                    setSelectedFaqIndex(idx);
                  }}
                >
                  {showFaqs && selectedFaqIndex === idx ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </Box>
              </Flex>
              {showFaqs && selectedFaqIndex === idx && (
                <Box bg="grey.800" padding="16px" mx="-14px">
                  <Text fontSize="14px" lineHeight="28px">
                    {faq?.description}
                  </Text>
                </Box>
              )}
            </Box>
          )}
        )}
      </Box>
    </Box>
  );
};

export default LbFAQ;
