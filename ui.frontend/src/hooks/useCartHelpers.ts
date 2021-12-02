import { useDispatch, useSelector } from "react-redux";
import { loadInitialCart } from "../redux/actions/cartActions";
import { ReduxState } from "../redux/types";
import { useMutation } from "@apollo/client";
import SET_PRODUCT_AS_RECURRING from "../graphql/SET_PRODUCT_AS_RECURRING";
import mapMagentoProductToCartItem from "../utils/mapMagentoProductToCartItem";

function useCartHelpers() {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const dispatch = useDispatch();
  const [setProductAsRecurring] = useMutation(SET_PRODUCT_AS_RECURRING);

  const setIsRecurring = async (
    id?: string,
    value?: boolean,
    topUpCap?: number
  ) => {
    const result = await setProductAsRecurring({
      variables: {
        item_id: id,
        recurring: value,
        topUpCap,
      },
    });
    dispatch(
      loadInitialCart(
        mapMagentoProductToCartItem(result.data.setProductAsRecurring.items)
      )
    );
  };
  const freeSimWithAutoTopUp =
    cartItems.length > 0 &&
    cartItems.every(
      (t) => (t.isFreeSimTopup && t.isAutoTopUp) || t.isFreeSim
    ) &&
    cartItems.some((t) => t.isFreeSimTopup && t.isAutoTopUp);
  return {
    setIsRecurring,
    freeSimWithAutoTopUp,
  };
}

export default useCartHelpers;
