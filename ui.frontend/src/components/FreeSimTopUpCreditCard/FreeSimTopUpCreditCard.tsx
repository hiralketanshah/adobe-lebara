import React from "react";
import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { FreeSimTopUpCreditCardProps } from "./types";
import Button from "../Button/Button";
import DeleteIcon from "../../icons/DeleteIcon";
import useAddToCart from "../../hooks/useAddToCart";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";
import { globalConfigs } from '../../GlobalConfigs.js';
import useCartHelpers from "../../hooks/useCartHelpers";
import Switch from "../ToggleSwitch/Switch";
import InfoBox from "../InfoBox/InfoBox";
import Select from "../Select/Select";
const DataFreeSimTopUpCreditCard: React.FC<FreeSimTopUpCreditCardProps> = ({
  isAutoTopUp,
  topUpCap,
  magentoId,
  selectedPrice,
  prices,
  onRemove,
  removeLabel,
  topUpCreditLabel,
  topUpRecommendedLabel,
  autoRenewLabel,
  autoRenewDesc,
  topUpCapLabel,
  topUpCapDesc
}) => {
  const [addItemToCart] = useAddToCart();
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(magentoId);
    }
  };
  const { setIsRecurring } = useCartHelpers();

  const handleTopUpCap = async (e: any) => {
    await setIsRecurring(magentoId, isAutoTopUp, Number(e.target.value));
  };
  return (
    <Box
      px={27}
      py={15}
      paddingInline={4}
      bg="white"
      border="1px"
      borderRadius="8px"
      borderColor={{ base: "white", lg: "greySuccess" }}
    >
      <Flex alignItems="center">
        <Box as="h3" fontSize="16px" pr="4px" pl="2px" fontWeight="bold">
          {topUpCreditLabel}
        </Box>
        <Flex
          w="101px"
          h="22.59px"
          borderRadius="10px"
          backgroundColor="rgba(0, 200, 0, .15)"
          ml="20px"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontWeight="500"
            lineHeight="14.06px"
            fontSize={12}
            color="success"
          >
            {topUpRecommendedLabel}
          </Text>
        </Flex>
        <Spacer />
        <Box
          as="h3"
          fontSize="30px"
          pr="4px"
          pl="2px"
          fontWeight="bold"
          color="bodyCopy"
        >
          {selectedPrice} {globalConfigs.currencySymbol}
        </Box>
      </Flex>
      <Divider mt="11px" mb="24px" />
      <Flex justifyContent="space-between">
        {prices.map((price) => (
          <Button
            minW="63.41px"
            height={30}
            colorScheme={selectedPrice === price ? "primary" : "grey"}
            color={selectedPrice === price ? "white" : "black"}
            onClick={async () => {
              if (price === selectedPrice) {
                await removeFromCartApi({
                  variables: {
                    itemId: magentoId,
                  },
                }).then(async () => {
                  await addItemToCart(
                    99999998,
                    "Free Sim Top Up",
                    "",
                    0,
                    "free-sim-top-up",
                    isAutoTopUp,
                    0
                  );
                });
                return;
              }
              await removeFromCartApi({
                variables: {
                  itemId: magentoId,
                },
              }).then(async () => {
                await addItemToCart(
                  99999998,
                  "Free Sim Top Up",
                  "",
                  Number(price),
                  "free-sim-top-up",
                  isAutoTopUp,
                  Number(price)
                );
              });
            }}
          >
            {price} {globalConfigs.currencySymbol}
          </Button>
        ))}
      </Flex>
      {selectedPrice !== 0 && (
        <Box mt="18px">
          <Switch
            isChecked={isAutoTopUp}
            label={autoRenewLabel}
            mr="4px"
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
        </Box>
      )}
      <Divider mt="26px" mb="8px" />
      <Button
        leftIcon={<DeleteIcon />}
        variant="ghost"
        color="secondary.500"
        onClick={handleRemoveClick}
      >
        {removeLabel}
      </Button>
    </Box>
  );
};

export default DataFreeSimTopUpCreditCard;
