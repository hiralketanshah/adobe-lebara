import { CartState } from "../reducers/cartReducer";
import { SelectedNumberState } from "../reducers/selectedNumberReducer";
import { SelectedVoucherState } from "../reducers/selectedVoucherReducer";
import { HighlightButtonState } from "../reducers/highlightedButtonReducer";
import { UserState } from "../reducers/userReducer";
import { TopUpsState } from "../reducers/topUpsReducer";
import { PaymentMethodsState } from "../reducers/paymentMethodsReducer";
import { HeaderSearchBoxOpenedState } from "../reducers/headerSearchBoxOpened";
import { LoadingState } from "../reducers/loadingReducer";
import { FormsState } from "../reducers/formsReducer";

export interface ReduxState {
  cart: CartState;
  phone: SelectedNumberState;
  voucher: SelectedVoucherState;
  highlightedButton: HighlightButtonState;
  headerSearchBox: HeaderSearchBoxOpenedState;
  user: UserState;
  loading: LoadingState;
  topUps: TopUpsState;
  paymentMethods: PaymentMethodsState;
  forms: FormsState;
}
