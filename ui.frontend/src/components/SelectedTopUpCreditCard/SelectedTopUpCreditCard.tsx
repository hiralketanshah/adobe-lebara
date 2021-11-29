import React from "react";
import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { SelectedTopUpCreditCardProps } from "./types";
import Button from "../Button/Button";
import DeleteIcon from "../../icons/DeleteIcon";
import Select from "../Select/Select";
import Switch from "../ToggleSwitch/Switch";
import InfoBox from "../InfoBox/InfoBox";
import { globalConfigs } from '../../GlobalConfigs.js';
import useCartHelpers from "../../hooks/useCartHelpers";
import { formatNumber } from "../../utils/formatNumber";
const DataSelectedTopUpCreditCard: React.FC<SelectedTopUpCreditCardProps> = ({
  isAutoTopUp,
  onRemove,
  magentoId,
  selectedPrice,
  prices,
  onSelectPrice,
  showAutoRenew,
  topUpCap,
  topUpCapDesc,
  topUpCapLabel,
  topUpCreditLabel,
  removeLabel,
  autoRenewLabel,
  autoRenewDesc
}) => {
  const handleChange = (e: any) => {
    if (!onSelectPrice) return;
    const price = Number(e.target.value);
    onSelectPrice(magentoId, price, isAutoTopUp, price);
  };
  const handleRemove = () => {
    if (!onRemove) return;
    onRemove(magentoId);
  };

  const { setIsRecurring } = useCartHelpers();

  const handleTopUpCap = async (e: any) => {
    await setIsRecurring(magentoId, isAutoTopUp, Number(e.target.value));
  };
  return (
    <Box
      px={27}
      pt={{ base: 15, lg: 26 }}
      pb={{ base: 15, lg: 13 }}
      bg="white"
      border="1px"
      borderRadius="8px"
      borderColor={{ base: "white", lg: "greySuccess" }}
    >
      <Flex alignItems="center" mb="23px">
        <Box
          as="h3"
          fontSize="16px"
          pr="4px"
          pl="2px"
          fontWeight="bold"
          color="bodyCopy"
        >
          {topUpCreditLabel}
        </Box>
        <Spacer />
        <Box
          as="h3"
          fontSize="30px"
          pr="4px"
          pl="2px"
          fontWeight="bold"
          color="bodyCopy"
        >
          <Select
            minW="max-content"
            onChange={handleChange}
            value={selectedPrice}
            color="primary.700"
            fontWeight="bold"
            fontSize={24}
            options={prices.map((price) => ({
              key: price,
              value: price.toString(),
              name: `${formatNumber(price)}${globalConfigs.currencySymbol}`,
            }))}
          />
        </Box>
      </Flex>
      {showAutoRenew && (
        <>
          <Switch
            label={autoRenewLabel}
            mr="4px"
            isChecked={isAutoTopUp}
            onChange={(e) => setIsRecurring(magentoId, e.target.checked)}
          />
          {isAutoTopUp && (
            <>
              <Text fontSize={12} color="grey.300" mt="4px">
                {autoRenewDesc}
                {selectedPrice}
              </Text>
              <Flex alignItems="center" mt="16px">
                <Box
                  as="h3"
                  fontSize="16px"
                  pr="4px"
                  pl="2px"
                  fontWeight="bold"
                  color="bodyCopy"
                >
                  <Text>{topUpCapLabel}</Text>
                  <Box fontWeight="400" fontSize="14px" mt="4px">
                    <InfoBox description={topUpCapDesc || ''} />
                  </Box>
                </Box>
                <Spacer />
                <Box
                  as="h3"
                  fontSize="30px"
                  pr="4px"
                  pl="2px"
                  fontWeight="bold"
                  color="bodyCopy"
                >
                  <Select
                    minW="max-content"
                    onChange={handleTopUpCap}
                    value={topUpCap}
                    color="primary.700"
                    fontWeight="bold"
                    fontSize={24}
                    options={[
                      selectedPrice,
                      selectedPrice * 2,
                      selectedPrice * 3,
                      selectedPrice * 4,
                      selectedPrice * 5,
                    ].map((price) => ({
                      key: price,
                      value: price.toString(),
                      name: `${globalConfigs.currencySymbol}${price}`,
                    }))}
                  />
                </Box>
              </Flex>
            </>
          )}
        </>
      )}
      <Divider my={4} />
      <Button
        leftIcon={<DeleteIcon />}
        variant="ghost"
        color="secondary.500"
        onClick={handleRemove}
      >
        {removeLabel}
      </Button>
    </Box>
  );
};

export default DataSelectedTopUpCreditCard;
