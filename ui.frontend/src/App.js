import {
  ChakraProvider,
  // ColorModeScript,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";


import colors from "./theme/colors";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import cartReducer from "./redux/reducers/cartReducer";
import selectedNumberReducer from "./redux/reducers/selectedNumberReducer";
import selectedVoucherReducer from "./redux/reducers/selectedVoucherReducer";
import highlightedButtonReducer from "./redux/reducers/highlightedButtonReducer";
import selectedProductReducer from "./redux/reducers/selectedProductReducer";
import userReducer from "./redux/reducers/userReducer";
import topUpsReducer from "./redux/reducers/topUpsReducer";
import paymentMethodsReducer from "./redux/reducers/paymentMethodsReducer";

const store = createStore(
  combineReducers({
    cart: cartReducer,
    phone: selectedNumberReducer,
    voucher: selectedVoucherReducer,
    highlightedButton: highlightedButtonReducer,
    product: selectedProductReducer,
    user: userReducer,
    topUps: topUpsReducer,
    paymentMethods: paymentMethodsReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = extendTheme(
  {
    // colors,
    // For DE customization we hardcoded the different color pattern
    // latter on we will decide on the bases of domain name which color pattern needs to be follow
    colors,
    fonts: {
      heading: "Roboto",
      body: "Roboto",
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          {this.childComponents}
          {this.childPages}
        </ChakraProvider>
      </Provider>
    );
  }
}

export default withModel(App);
