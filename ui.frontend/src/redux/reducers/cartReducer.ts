import { createReducer } from "redux-act";
import produce from "immer";
import {
  addToCart,
  clearCart,
  loadInitialCart,
  removeItemFromCart,
  setCartItemsLoading,
} from "../actions/cartActions";
import { CartItem } from "../types/cartTypes";

export interface CartState {
  items: CartItem[];
  loading: boolean;
}

const defaultState: CartState = {
  items: [],
  loading: true,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer
  .on(setCartItemsLoading, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  )
  .on(loadInitialCart, (state, payload) =>
    produce(state, (draft) => {
      draft.items = payload;
      draft.loading = false;
    })
  )
  .on(addToCart, (state, payload) =>
    produce(state, (draft) => {
      if (!draft.items.find((t) => t.id === payload.id)) {
        draft.items.push(payload);
      }
    })
  )
  .on(removeItemFromCart, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.items.findIndex((t) => t.id === payload);
      draft.items.splice(index, 1);
    })
  )
  .on(clearCart, (state) =>
    produce(state, (draft) => {
      draft.items.splice(0, state.items.length);
    })
  );

export default reducer;
