import { CartState } from "../reducers/cartReducer";
import { SelectedNumberState } from "../reducers/selectedNumberReducer";
import { SelectedVoucherState } from "../reducers/selectedVoucherReducer";
import { HighlightButtonState } from "../reducers/highlightedButtonReducer";
import { SelectedProductState } from "../reducers/selectedProductReducer";
import { UserState } from "../reducers/userReducer";
import { TopUpsState } from "../reducers/topUpsReducer";

export interface ReduxState {
  cart: CartState;
  phone: SelectedNumberState;
  voucher: SelectedVoucherState;
  highlightedButton: HighlightButtonState;
  product: SelectedProductState;
  user: UserState;
  topUps: TopUpsState;
}
