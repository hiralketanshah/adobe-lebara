// @ts-nocheck
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ExpandablePlanCardProps } from "./types";
import Button from "../Button/Button";
import List from "../List/List";
import CountriesList from "../CountriesList/CountriesList";

const ExpandablePlanCard: React.FC<ExpandablePlanCardProps> = ({
  offer,
  id,
  minutesField,
  isExpanded,
  hideLabel,
  showLabel,
  buttonLabel,
  allowanceList,
  unlimitedTextField,
  onDetailsClick,
}) => {
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id, !isExpanded);
    }
  };
  return (
    <Flex
      flexDirection="column"
      background="white"
      borderRadius="lg"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      p="15px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box d={{ md: "flex" }}>
          <Flex
            alignItems="center"
            color="lebaraChambray.600"
            mx={{ md: "20px" }}
          >
            <Text
              as="h3"
              fontSize={30}
              pr="6px"
              pl="2px"
              fontWeight="bold"
              fontFamily="Chiswick Grotesque Lebara"
            >
              £{offer?.cost}
            </Text>
            <Text as="p" fontSize={16} mr="30px">
              {" "}
              / {offer?.validity}
            </Text>
            <Divider
              my={3.5}
              orientation="vertical"
              color="border"
              h="50px"
              w="1px"
            />
          </Flex>
          <Box
            justifyContent="space-between"
            alignItems="center"
            color="lebaraChambray"
            d={{ md: "flex", base: "none" }}
          >
            <Text fontSize={16} mr="30px">
              <Text fontSize={16} fontWeight="bold" as="span" mr="15px">
                {"12GB"}
              </Text>
              {allowanceList[0]?.name}
            </Text>
            <Divider
              my={3.5}
              orientation="vertical"
              color="border"
              h="50px"
              w="1px"
            />
          </Box>
          <Box
            alignItems="center"
            d={{ md: "flex", base: "none" }}
            mx={{ md: "30px" }}
          >
            <Text fontSize={16} marginRight={{ md: "30px" }}>
              <span>
                {unlimitedTextField}
                <br />
                {minutesField}
              </span>
            </Text>
            <Divider
              my={3.5}
              orientation="vertical"
              color="border"
              h="50px"
              w="1px"
            />
          </Box>
        </Box>
        <Box alignItems="center" d="flex">
          <Button d={{ md: "block", base: "none" }} minW={140}>
            {buttonLabel}
          </Button>
          <Button
            variant="ghost"
            color="fuschia.500"
            onClick={handleDetailsClick}
          >
            {isExpanded ? hideLabel : showLabel}
          </Button>
        </Box>
      </Flex>
      {isExpanded && (
        <Box mb={7} d={{ md: "flex" }}>
          <Box
            paddingRight={{ md: 53 }}
            borderRight={{ md: "1px" }}
            borderRightColor={{ md: "border" }}
          >
            <Text fontSize={22} color="bodyCopy" fontWeight="bold">
              {offer?.planInfo?.title}
            </Text>
            <Box mt={4}>
              <List
                textColor="bodyCopy"
                iconFill="bodyCopy"
                items={offer?.planInfo?.listPlanItem}
              />
            </Box>
          </Box>
          <Box ml={{ md: "40px" }}>
            <Text color="lebaraBlue.150" fontSize={16} fontWeight="bold">
              {offer?.planInfo?.countryTitle}
            </Text>
            <Box mt={2}>
              <CountriesList items={offer?.planInfo?.countryList} />
            </Box>
          </Box>
        </Box>
      )}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color="lebaraChambray"
        d={{ md: "none", base: "flex" }}
      >
        <Text fontSize={16}>
          {allowanceList[0]?.name}
          <br />
          <Text fontSize={16} fontWeight="bold" as="span">
            {"12GB"}
          </Text>
        </Text>
        <Text fontSize={16} w="90px">
          <span>
            {unlimitedTextField}
            <br />
            {minutesField}
          </span>
        </Text>
        <Button minW={140}>{buttonLabel}</Button>
      </Flex>
    </Flex>
  );
};

export default ExpandablePlanCard;
