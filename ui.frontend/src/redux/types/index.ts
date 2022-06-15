import { CartState } from "@lebara/ui/src/redux/reducers/cartReducer";
import { SelectedNumberState } from "@lebara/ui/src/redux/reducers/selectedNumberReducer";
import { SelectedVoucherState } from "@lebara/ui/src/redux/reducers/selectedVoucherReducer";
import { HighlightButtonState } from "@lebara/ui/src/redux/reducers/highlightedButtonReducer";
import { SelectedProductState } from "@lebara/ui/src/redux/reducers/selectedProductReducer";
import { UserState } from "@lebara/ui/src/redux/reducers/userReducer";
import { TopUpsState } from "@lebara/ui/src/redux/reducers/topUpsReducer";
import { PaymentMethodsState } from "@lebara/ui/src/redux/reducers/paymentMethodsReducer";
import { HeaderSearchBoxOpenedState } from "@lebara/ui/src/redux/reducers/headerSearchBoxOpened";
import { LoadingState } from "@lebara/ui/src/redux/reducers/loadingReducer";
import { FormsState } from "@lebara/ui/src/redux/reducers/formsReducer";
import { ModalState } from "@lebara/ui/src/redux/reducers/modalReducer";
import { SocketState } from "@lebara/ui/src/redux/reducers/socketReducer";
import { UserPaymentMethodsState } from "@lebara/ui/src/redux/reducers/userPaymentMethodsReducer";

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
  modal: ModalState;
  socket: SocketState;
  userPaymentMethods: UserPaymentMethodsState;
}
