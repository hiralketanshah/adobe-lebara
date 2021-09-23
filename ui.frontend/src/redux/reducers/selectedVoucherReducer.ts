import { createReducer } from "redux-act";
import produce from "immer";
import { selectVoucher } from "../actions/selectVoucherActions";

export interface SelectedVoucherState {
  voucherCode: string;
}

const defaultState: SelectedVoucherState = {
  voucherCode: "",
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(selectVoucher, (state, payload) =>
  produce(state, (draft) => {
    draft.voucherCode = payload;
  })
);

export default reducer;
