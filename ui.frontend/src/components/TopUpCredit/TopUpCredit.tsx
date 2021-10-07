import React, { useState } from "react";
import { Flex, Box, Text, ButtonGroup } from "@chakra-ui/react";
import TopUpMobileIcon from "../../icons/TopUpMobileIcon";
import { Icon } from "../Icon/Icon";
import Button from "../Button/Button";
import { TopUpCreditProps } from "./types";

const TopUpCredit: React.FC<TopUpCreditProps> = ({
  heading,
  subheading,
  topUpOptions,
  onBuyTopUp,
  onAddToCart,
}) => {
  const [optionSelected, setOptionSelected] = useState<number>();

  const headingStyles = {
    fontSize: {
      base: "32px",
      lg: "47px",
    },
    letterSpacing: "0.01em",
    fontWeight: "bold",
    color: "white",
    lineHeight: "1.5",
  };
  const textStyles = {
    fontSize: {
      base: "16px",
      lg: "32px",
    },
    lineHeight: "1.4",
  };

  const handleBuyTopUp = () => {
    if (!optionSelected || !onBuyTopUp) return;
    onBuyTopUp(optionSelected);
  };

  const handleAddToCart = () => {
    if (!optionSelected || !onAddToCart) return;
    onAddToCart(optionSelected);
  };
  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      align="stretch"
      p="30px 22.75px"
    >
      <Flex
        flexDir="column"
        bg={{ lg: "lightenPrimary.500" }}
        justifyContent="center"
        px={{ lg: "84px" }}
        w="100%"
        textAlign="left"
      >
        <Text as="h3" mb="10px" {...headingStyles}>
          {heading}
        </Text>
        <Text mb="20px" color="white" {...textStyles}>
          {subheading}
        </Text>
      </Flex>
      <Box borderRadius="lg" bg="white" w="100%">
        <Flex
          justifyContent="space-between"
          p={{ base: "20px 15px", lg: "68px 84px 0px" }}
        >
          <Box>
            <Text mb="5px" fontWeight="bold" {...textStyles}>
              Quick Topup
            </Text>
            <Text fontSize="16px">Choose from the below amounts</Text>
          </Box>
          <Flex
            w="75px"
            h="75px"
            borderRadius="full"
            bg="lightenPrimary.50"
            justifyContent="center"
            alignItems="center"
            ml="30px"
          >
            <Icon icon={TopUpMobileIcon} w="32px" h="39px" ml="2px" />
          </Flex>
        </Flex>

        <Box
          bg={{ base: "grey.50", lg: "white" }}
          p={{ base: "15px", lg: "27px 84px" }}
          overflowX="auto"
        >
          <ButtonGroup>
            {topUpOptions.map((option) => (
              <Button
                mr="10px"
                minW={{ base: "81px", lg: "139px" }}
                variant={optionSelected === option ? "solid" : "outline"}
                bg={optionSelected === option ? "primary.500" : "white"}
                px="20px"
                value={option}
                onClick={() => setOptionSelected(option)}
              >
                €{option}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        <Flex
          bg={{ base: "grey.50", lg: "white" }}
          p={{ base: "15px", lg: "14px 84px" }}
          overflowX="auto"
          flexDirection={{ base: "column", lg: "row-reverse" }}
          gridGap={{ lg: "11.24px" }}
        >
          <Button
            disabled={!optionSelected}
            isFullWidth
            mb="20px"
            variant="outline"
            onClick={handleBuyTopUp}
          >
            BUY TOP UP
          </Button>
          <Button
            disabled={!optionSelected}
            isFullWidth
            variant="outline"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TopUpCredit;
