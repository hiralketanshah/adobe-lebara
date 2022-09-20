import { CartState } from "@lebara/core/redux/reducers/cartReducer";
import { SelectedNumberState } from "@lebara/core/redux/reducers/selectedNumberReducer";
import { SelectedVoucherState } from "@lebara/core/redux/reducers/selectedVoucherReducer";
import { HighlightButtonState } from "@lebara/core/redux/reducers/highlightedButtonReducer";
import { SelectedProductState } from "@lebara/core/redux/reducers/selectedProductReducer";
import { UserState } from "@lebara/core/redux/reducers/userReducer";
import { TopUpsState } from "@lebara/core/redux/reducers/topUpsReducer";
import { PaymentMethodsState } from "@lebara/core/redux/reducers/paymentMethodsReducer";
import { HeaderSearchBoxOpenedState } from "@lebara/core/redux/reducers/headerSearchBoxOpened";
import { LoadingState } from "@lebara/core/redux/reducers/loadingReducer";
import { FormsState } from "@lebara/core/redux/reducers/formsReducer";
import { ModalState } from "@lebara/core/redux/reducers/modalReducer";
import { SocketState } from "@lebara/core/redux/reducers/socketReducer";
import { UserPaymentMethodsState } from "@lebara/core/redux/reducers/userPaymentMethodsReducer";

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
