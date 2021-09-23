import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import NeedHelpFooter from "../NeedHelpFooter/NeedHelpFooter";
import { SelectNumberAndOrderDetailsLayoutProps } from "./types";
import Button from "../Button/Button";
import { ReduxState } from "../../redux/types";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";
import { loadInitialCart } from "../../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import { CartItem } from "../../redux/types/cartTypes";

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
          backgroundColor="lebaraChambray.800"
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
                +Free Sim
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
                color="fuschia.500"
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
                    history.push("/postpaid", history.location.state);
                  });
                }}
              >
                Edit
              </Button>
            </>
          )}
        </Flex>
        <Box backgroundColor="lebaraBlue.50" px="20px" pt="15px" pb="15px">
          {heading && (
            <Text
              as="h3"
              color="lebaraChambray.500"
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
              bg={{ lg: "white" }}
              px={{ lg: "60px" }}
              my={{ lg: "20px" }}
            >
              {children}
            </Box>
          </Center>
        </Box>
        <NeedHelpFooter />
      </Box>
    );
  };

export default SelectNumberAndOrderDetailsLayout;
