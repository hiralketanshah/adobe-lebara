import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SelectNumberAndOrderDetailsLayoutProps } from "./types";
import Button from "../components/Button/Button";
import { ReduxState } from "../redux/types";
import REMOVE_FROM_CART from "../graphql/REMOVE_FROM_CART";
import { loadInitialCart } from "../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../utils/mapMagentoProductToCartItem";
import { CartItem } from "../redux/types/cartTypes";
import { globalConfigs, globalConstants } from "../GlobalConfigs";

const SelectNumberAndOrderDetailsLayout: React.FC<SelectNumberAndOrderDetailsLayoutProps> =
  ({ heading, children }) => {
    const selectedProduct = useSelector(
      (state: ReduxState) => state.product.product
    );
    const cartItems = useSelector((state: ReduxState) => state.cart.items);
    const history = useHistory();
    const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
    const dispatch = useDispatch();

    return (
      <Box>
        <Flex
          backgroundColor="primary.800"
          px="20px"
          py="13px"
          justifyContent="space-between"
          alignItems="center"
        >
          {selectedProduct && !selectedProduct.isPostPaid && (
            <>
              <Text
                fontWeight="bold"
                fontSize="18px"
                color="white"
                whiteSpace="pre-line"
              >
                {selectedProduct?.product} <br />
              </Text>
            </>
          )}
          {selectedProduct && selectedProduct.isPostPaid && (
            <>
              <Text
                fontWeight="bold"
                fontSize="18px"
                color="white"
                whiteSpace="pre-line"
              >
                {selectedProduct?.product} <br />
              </Text>
              <Button
                leftIcon={<BiEdit color="bodyCopy" />}
                variant="ghost"
                color="secondary.500"
                onClick={() => {
                  const cartItem = cartItems?.find(
                    (t: CartItem) => t.id === Number(selectedProduct?.id)
                  );
                  removeFromCartApi({
                    variables: {
                      itemId: cartItem?.magentoId,
                    },
                  }).then((res) => {
                    dispatch(
                      loadInitialCart(
                        mapMagentoProductToCartItem(
                          res.data.removeProduct.items
                        )
                      )
                    );
                    history.push((globalConfigs.journeyPages[globalConstants.POSTPAID]  || '/'), history.location.state);
                  });
                }}
              >
              </Button>
            </>
          )}
        </Flex>
        <Box backgroundColor="lightenPrimary.50" px="20px" pt="15px" pb="15px">
          {heading && (
            <Text
              as="h3"
              color="primary.500"
              fontSize={22}
              fontWeight="bold"
              pb="15px"
            >
              {heading}
            </Text>
          )}
          <Center>
            <Box
              maxW="850px"
              w="100%"
              bg={{ lg: "none" }}
              px={{ lg: "0" }}
              mt={{ base: "30px", lg: "120px" }}
              mb={{ base: "30px", lg: "148px" }}
              borderRadius="8px"
            >
              {children}
            </Box>
          </Center>
        </Box>
      </Box>
    );
  };

export default SelectNumberAndOrderDetailsLayout;
