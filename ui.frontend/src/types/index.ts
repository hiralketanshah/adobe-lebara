import { CartState } from "../redux/reducers/cartReducer";
import { SelectedNumberState } from "../redux/reducers/selectedNumberReducer";
import { SelectedVoucherState } from "../redux/reducers/selectedVoucherReducer";
import { HighlightButtonState } from "../redux/reducers/highlightedButtonReducer";
import { SelectedProductState } from "../redux/reducers/selectedProductReducer";
import { UserState } from "../redux/reducers/userReducer";
import { TopUpsState } from "../redux/reducers/topUpsReducer";
import { PaymentMethodsState } from "../redux/reducers/paymentMethodsReducer";
import { HeaderSearchBoxOpenedState } from "../redux/reducers/headerSearchBoxOpened";
import { LoadingState } from "../redux/reducers/loadingReducer";
import { FormsState } from "../redux/reducers/formsReducer";

export interface ReduxState {
  cart: CartState;
  phone: SelectedNumberState;
  voucher: SelectedVoucherState;
  highlightedButton: HighlightButtonState;
  headerSearchBox: HeaderSearchBoxOpenedState;
  product: SelectedProductState;
  user: UserState;
  loading: LoadingState;
  topUps: TopUpsState;
  paymentMethods: PaymentMethodsState;
  forms: FormsState;
}
