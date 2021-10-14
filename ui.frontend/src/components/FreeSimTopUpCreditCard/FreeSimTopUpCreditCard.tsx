import React from "react";
import { Box, Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { FreeSimTopUpCreditCardProps } from "./types";
import Button from "../Button/Button";
import DeleteIcon from "../../icons/DeleteIcon";
import useAddToCart from "../../hooks/useAddToCart";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";

const DataFreeSimTopUpCreditCard: React.FC<FreeSimTopUpCreditCardProps> = ({
  magentoId,
  selectedPrice,
  prices,
  onRemove,
  removeLabel,
  topUpCreditLabel,
  topUpRecommendedLabel
}) => {
  const [addItemToCart] = useAddToCart();
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(magentoId);
    }
  };

  return (
    <Box
      px={27}
      py={15}
      boxShadow="md"
      paddingInline={4}
      bg="white"
      borderRadius={8}
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
          €{selectedPrice}
        </Box>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent="space-between">
        {prices.map((price) => (
          <Button
            minW="63.41px"
            height={30}
            colorScheme={selectedPrice === price ? "primary" : "grey"}
            color={selectedPrice === price ? "white" : "black"}
            onClick={async () => {
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
                  "free-sim-top-up"
                );
              });
            }}
          >
            €{price}
          </Button>
        ))}
      </Flex>
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
