import React from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { PurchaseSummaryProps } from "./types";

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ items, grandTotalLabel }) => (
  <Flex flexDirection="column" borderRadius={8} backgroundColor="white">
    {items &&
      items.length > 1 &&
      items.map((item) => (
        <Flex flexDirection="column">
          <Flex
            key={item.description}
            fontSize={14}
            justifyContent="space-between"
          >
            <Text>{item.description}</Text>
            <Text fontSize={16} fontWeight="bold">
              {item.amount < 0 ? "-" : ""}€{Math.abs(item.amount)}
            </Text>
          </Flex>
          <Divider color="grey.50" my={1.5} />
        </Flex>
      ))}
    <Flex
      fontSize={16}
      justifyContent="space-between"
      padding="15px"
      fontWeight="bold"
      border="1px"
      borderRadius="8px"
      borderColor="greySuccess"
    >
      <Text>{grandTotalLabel}</Text>
      <Text>
        €
        {items
          .reduce((sum, t) => sum + t.amount, 0)
          .toLocaleString("en-US", {
            maximumFractionDigits: 2,
            useGrouping: false,
          })}
      </Text>
    </Flex>
  </Flex>
);

export default PurchaseSummary;
