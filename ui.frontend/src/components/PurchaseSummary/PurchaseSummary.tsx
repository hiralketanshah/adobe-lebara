import React from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { PurchaseSummaryProps } from "./types";
import {globalConfigs} from  '../../GlobalConfigs.js';
import { formatNumber } from "../../utils/formatNumber";
const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ items, grandTotalLabel }) => (
<Flex
    flexDirection="column"
    borderRadius={8}
    backgroundColor="white"
    borderWidth={1}
    borderColor={{ lg: "greySuccess" }}
  >
    {items &&
      items.length > 1 &&
      items.map((item) => (
        <Flex flexDirection="column" py="9px" px="16px">
          <Flex
            key={item.description}
            fontSize={14}
            justifyContent="space-between"
          >
            <Text>{item.description}</Text>
            <Text fontSize={16} fontWeight="bold">
              {item.amount < 0 ? "-" : ""}
              {formatNumber(Math.abs(item.amount))} {globalConfigs.currencySymbol}
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
      borderRadius="8px"
      borderColor={{ lg: "greySuccess" }}
    >
      <Text>{grandTotalLabel}</Text>
      <Text>
        {items
          .reduce((sum, t) => sum + t.amount, 0)
          .toLocaleString((globalConfigs.locale || "de-DE"), {
            maximumFractionDigits: 2,
            useGrouping: false,
          })}{" "}
        {globalConfigs.currencySymbol}
      </Text>
    </Flex>
  </Flex>
);

export default PurchaseSummary;
