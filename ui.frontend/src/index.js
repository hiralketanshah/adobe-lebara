import "react-app-polyfill/stable";
import "react-app-polyfill/ie9";
import "custom-event-polyfill";

import {Constants, ModelManager} from "@adobe/aem-spa-page-model-manager";
import {createBrowserHistory} from "history";
import React from "react";
import {render} from "react-dom";
import {Router} from "react-router-dom";
import App from "./App";
import "./components/import-components";
import "./index.css";
import "./styles/index.scss";
import {Provider} from "react-redux";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import {globalConfigs} from './GlobalConfigs.js';
import store from "@lebara/ui/src/store";

const client = new ApolloClient({
  uri: `${globalConfigs.apiHostUri}${globalConfigs.gqlEndpoint}`,
  credentials: "include",
  cache: new InMemoryCache(),
});

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
