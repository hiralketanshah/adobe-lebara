import "react-app-polyfill/stable";
import "react-app-polyfill/ie9";
import "custom-event-polyfill";

import { Constants, ModelManager } from "@adobe/aem-spa-page-model-manager";
import { createBrowserHistory } from "history";
import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import "./components/import-components";
import "./index.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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
import headerSearchBoxOpenedReducer from "./redux/reducers/headerSearchBoxOpened";
import selectedProductReducer from "./redux/reducers/selectedProductReducer";
import userReducer from "./redux/reducers/userReducer";
import topUpsReducer from "./redux/reducers/topUpsReducer";
import paymentMethodsReducer from "./redux/reducers/paymentMethodsReducer";
import loadingReducer from "./redux/reducers/loadingReducer";
import formsReducer from "./redux/reducers/formsReducer";
import {globalConfigs} from  './GlobalConfigs.js';
const client = new ApolloClient({
  uri: `${globalConfigs.apiHostUri}${globalConfigs.gqlEndpoint}`,
  credentials: "include",
  cache: new InMemoryCache(),
});
const store = createStore(
  combineReducers({
    cart: cartReducer,
    phone: selectedNumberReducer,
    voucher: selectedVoucherReducer,
    highlightedButton: highlightedButtonReducer,
    headerSearchBox: headerSearchBoxOpenedReducer,
    product: selectedProductReducer,
    user: userReducer,
    loading: loadingReducer,
    topUps: topUpsReducer,
    paymentMethods: paymentMethodsReducer,
    forms: formsReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  (window).__REDUX_DEVTOOLS_EXTENSION__ &&
    // eslint-disable-next-line no-underscore-dangle
    (window).__REDUX_DEVTOOLS_EXTENSION__()
);

const renderApp = () => {
  ModelManager.initialize().then((pageModel) => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <ApolloProvider client={client}>
         <Provider store={store}>
        <App
          history={history}
          cqChildren={pageModel[Constants.CHILDREN_PROP]}
          cqItems={pageModel[Constants.ITEMS_PROP]}
          cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
          cqPath={pageModel[Constants.PATH_PROP]}
          locationPathname={window.location.pathname}
        />
        </Provider>
        </ApolloProvider>
      </Router>,
      document.getElementById("spa-root")
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderApp();
});
