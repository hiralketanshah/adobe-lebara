import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FcMinus, GoPlus } from "react-icons/all";
import { HomeFaqsProps } from "./types";

const HomeFaqs: React.FC<HomeFaqsProps> = ({ title, options }) => {
  const half = Math.ceil(options.length / 2);

  const firstHalf = options.slice(0, half);
  const secondHalf = options.slice(-half);

  const renderAccordions = (items: any[]) =>
    items.map((menuItem) => (
      <AccordionItem
        key={menuItem.key}
        borderTop="none"
        borderBottomWidth="1px"
        borderColor="lightenPrimary.600"
      >
        {({ isExpanded }) => (
          <>
            <Text as="h3" fontSize={14}>
              <AccordionButton p={0}>
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize={14}
                  letterSpacing="0.25px"
                  py="10px"
                >
                  {menuItem.question}
                </Box>
                {isExpanded ? (
                  <FcMinus fontSize="12px" fontWeight="bold" />
                ) : (
                  <GoPlus fontSize="12px" fontWeight="bold" />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel p={0}>
              <Text
                color="grey.300"
                letterSpacing="0.25px"
                lineHeight="20px"
                pb="8px"
                dangerouslySetInnerHTML={{ __html: menuItem.answer }}>
              </Text>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    ));

  return (
    <Box
      py={{ base: "30px", lg: "60px" }}
      px={{ base: "20px", lg: "80px" }}
      bg="lightenPrimary.50"
    >
      <Heading color="primary.500" fontSize={{ base: "32px", lg: " 47px" }}>
        {title}
      </Heading>
      <Accordion defaultIndex={[0]} color="primary.500">
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          gridGap={{ base: 0, lg: "24px" }}
          fontSize="14px"
        >
          <Flex flexDirection="column" flex={1}>
            {renderAccordions(firstHalf)}
          </Flex>
          <Flex flexDirection="column" flex={1}>
            {renderAccordions(secondHalf)}
          </Flex>
        </Flex>
      </Accordion>
    </Box>
  );
};

export default HomeFaqs;
