import { createReducer } from "redux-act";
import produce from "immer";
import { selectProduct } from "../actions/selectProductActions";
import { SelectedProduct } from "../types/productTypes";

export interface SelectedProductState {
  product?: SelectedProduct;
}

const defaultState: SelectedProductState = {
  product: undefined,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(selectProduct, (state, payload) =>
  produce(state, (draft) => {
    draft.product = payload;
  })
);

export default reducer;
