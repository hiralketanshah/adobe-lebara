import React from "react";
import {
  Box,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { useLocalStorage } from "@rehooks/local-storage";
import OffersBg from "./Responsive_topup_credits_background.svg";
import TopUpCredit from "./TopUpCredit";
import Button from "../Button/Button";
import { loadInitialCart } from "../../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import ADD_TO_CART from "../../graphql/ADD_TO_CART";
import { ReduxState } from "../../redux/types";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";
import { TopUpCreditProps } from "./types";
import getDynamicValues from "../../utils/get-aem-dynamic-values";

const TopupRoute: React.FC<TopUpCreditProps> = ({
  heading,
  subheading,
  rightTitle,
  rightSubTitle,
  addToCartLabel,
  buyTopUpLabel,
  popUpCartMessage,
  popUpCtaLabel,
  topUpOptions,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const [addToCartApi] = useMutation(ADD_TO_CART);
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const [userToken] = useLocalStorage("userToken");
  const cartItems = useSelector((state: ReduxState) => state.cart.items);

  const addTopupToCart = async (amount: number) => {
    let finalAmount = amount;
    const previousTopUp = cartItems.find((t) => t.duration.includes("Top-up"));
    if (previousTopUp) {
      finalAmount += previousTopUp.price;
      await removeFromCartApi({
        variables: {
          itemId: previousTopUp.magentoId,
        },
      });
    }
    return addToCartApi({
      variables: {
        productInput: {
          product: {
            sku: `666${finalAmount}`,
            name: `Top-up${finalAmount}`,
            price: Number(finalAmount),
          },
        },
      },
    }).then((res) => {
      dispatch(
        loadInitialCart(mapMagentoProductToCartItem(res.data.addProduct.items))
      );
    });
  };
  const handleBuyTopUp = async (amount: number) => {
    await addTopupToCart(amount);
    history.push(userToken ? "/order-details" : "/login");
  };
  const handleViewCartClick = () => {
    history.push(userToken ? "/order-details" : "/login");
    // if signed in send him to order details.
    // history.push("/order-details");
  };
  const handleAddToCart = async (amount: number) => {
    await addTopupToCart(amount);

    toast({
      position: "bottom",
      render: () => (
        <Flex
          color="white"
          p={3}
          bg="primary.700"
          borderRadius="4px"
          justifyContent="space-between"
          w="420px"
        >
          <Text py="12px">
            {getDynamicValues(popUpCartMessage, [`€${amount}`])}
          </Text>
          <Button
            variant="ghost"
            colorScheme="secondary"
            onClick={handleViewCartClick}
          >
            {popUpCtaLabel}
          </Button>
        </Flex>
      ),
    });
  };
  return (
    <>
      <Box
        backgroundImage={{ base: OffersBg, lg: "none" }}
        backgroundSize="cover"
      >
        <TopUpCredit
          heading={heading}
          subheading={subheading}
          rightTitle={rightTitle}
          rightSubTitle={rightSubTitle}
          addToCartLabel={addToCartLabel}
          buyTopUpLabel={buyTopUpLabel}
          topUpOptions={topUpOptions}
          onAddToCart={handleAddToCart}
          onBuyTopUp={handleBuyTopUp}
          popUpCartMessage={popUpCartMessage}
          popUpCtaLabel={popUpCtaLabel}
        />
      </Box>
    </>
  );
};

export default TopupRoute;
