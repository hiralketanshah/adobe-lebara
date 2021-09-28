import { createAction } from "redux-act";
import { CartItem } from "../types/cartTypes";

export const loadInitialCart = createAction<CartItem[]>("load initial cart");
export const setCartItemsLoading = createAction("set cart items loading");
export const addToCart = createAction<CartItem>("add to cart");
export const removeItemFromCart = createAction<number>("clear cart");
export const clearCart = createAction("clear cart");
