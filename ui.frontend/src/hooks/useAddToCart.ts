import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { loadInitialCart } from "../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../utils/mapMagentoProductToCartItem";
import ADD_TO_CART from "../graphql/ADD_TO_CART";
import { selectProduct } from "../redux/actions/selectProductActions";
import {globalConfigs} from  '../GlobalConfigs.js';
function useAddToCart() {
  const [addToCartApi] = useMutation(ADD_TO_CART);
  const dispatch = useDispatch();

  const addItemToCart = (
    id: number,
    name: string,
    description: string,
    price: number,
    type: string,
    recurring?: boolean,
    topUpCap?: number,
    skipGoogleAnalytics?: boolean
  ) =>
    addToCartApi({
      variables: {
        productInput: {
          recurring,
          topUpCap,
          product: {
            sku: String(id),
            name:
              type === "addon"
                ? `${name}|${description}|addon`
                : `${name}|${description}`,
            price,
          },
        },
      },
    }).then((res) => {
      if (type === "plan") {
        dispatch(
          selectProduct({
            id: id.toString(),
            product: `${name}\n ${globalConfigs.currencySymbol}${price}`,
            isPostPaid: false,
          })
        );
      }
      dispatch(
        loadInitialCart(mapMagentoProductToCartItem(res.data.addProduct.items))
      );
    });
  return [addItemToCart];
}

export default useAddToCart;
