import { createReducer } from "redux-act";
import produce from "immer";
import { setPaymentMethods } from "../actions/paymentMethodsActions";

export interface PaymentMethodsState {
  paymentMethods: any;
}

const defaultState: PaymentMethodsState = {
  paymentMethods: undefined,
};
const reducer = createReducer<typeof defaultState>({}, defaultState);

reducer.on(setPaymentMethods, (state, payload) =>
  produce(state, (draft) => {
    draft.paymentMethods = payload;
  })
);

export default reducer;
