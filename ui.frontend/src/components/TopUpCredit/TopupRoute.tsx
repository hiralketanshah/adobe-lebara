import React from "react";
import {
  Box,
  Text,
  Flex,
  useToast,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { useLocalStorage } from "@rehooks/local-storage";
import OffersBg from "../assets/Responsive_topup_credits_background.svg";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import TopUpCredit from "./TopUpCredit";
import Button from "../Button/Button";
import { loadInitialCart } from "../../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import ADD_TO_CART from "../../graphql/ADD_TO_CART";
import { ReduxState } from "../../redux/types";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";

const TopupRoute: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const [addToCartApi] = useMutation(ADD_TO_CART);
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const [userToken] = useLocalStorage("userToken");
  const cartItems = useSelector((state: ReduxState) => state.cart.items);

  const topUpOptions = useSelector((state: ReduxState) => state.topUps.items);
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
          <Text py="12px">Top up Credit €{amount} added to cart</Text>
          <Button
            variant="ghost"
            colorScheme="secondary"
            onClick={handleViewCartClick}
          >
            view cart
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
        <Box px="15px" bg="grey.50" py="2px">
          <Breadcrumb
            {...{
              separator: (
                <Box mx="9px" color="primary.500">
                  /
                </Box>
              ),
              fontSize: "sm",
              spacing: 0,
              children: [
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" color="primary.500" fontWeight="500">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    href="#"
                    color="secondary.500"
                    fontWeight="500"
                  >
                    Top Up
                  </BreadcrumbLink>
                </BreadcrumbItem>,
              ],
            }}
          />
        </Box>
        <TopUpCredit
          heading="Top Up Credits"
          subheading="Buy credit to call, send SMS and use data"
          topUpOptions={topUpOptions}
          onAddToCart={handleAddToCart}
          onBuyTopUp={handleBuyTopUp}
        />
      </Box>
    </>
  );
};

export default TopupRoute;
