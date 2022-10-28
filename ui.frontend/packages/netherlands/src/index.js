import "react-app-polyfill/stable";
import "react-app-polyfill/ie9";
import "custom-event-polyfill";

import {Constants, ModelManager, PathUtils} from "@adobe/aem-spa-page-model-manager";
import {createBrowserHistory} from "history";
import React from "react";
import {render} from "react-dom";
import {Router} from "react-router-dom";
import App from "./App";
import LebaraModelClient from "../../core/src/LebaraModelClient";
import "../../core/src/components/import-components";
import "./index.css";
import "../../core/src/styles/index.scss";
import "./styles/richtext-new.styles.scss";
import {Provider} from "react-redux";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import {globalConfigs} from '@lebara/core/configs/globalConfigs';
import store from "@lebara/netherlands/redux/store";
import { pdfjs } from "react-pdf";
import axios from "axios";
import {onError} from "@apollo/client/link/error";
import { AuthoringUtils } from "@adobe/aem-spa-page-model-manager";
import Cookies from "universal-cookie";
import { isAddressUpdateBlockedCookieKey } from "@lebara/core/components/UserDetails/constats";
import {getLocale} from "@lebara/core/hooks/useLocale";

pdfjs.GlobalWorkerOptions.workerSrc = '/etc.clientlibs/lebara/clientlibs/clientlib-react-NL/resources/pdf.worker.js';
const defaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
    },
    query: {
        fetchPolicy: "no-cache",
    },
};
const locale = getLocale();

const httpLink = new HttpLink({
    uri: `${globalConfigs.apiHostUri}${globalConfigs.gqlEndpoint}`,
    credentials: "include",
    headers: {
        channel: "Web",
        country: `${globalConfigs.country}`,
        locale,
    },
});

let isLoading = false;
const logoutLink = onError(({ networkError, operation }) => {
    if (
        networkError &&
        networkError.statusCode === 401 &&
        operation.operationName !== "getSessionStatus" && !AuthoringUtils.isInEditor()
    ) {
        if (isLoading) return;
        isLoading = true;
        new Cookies().remove(isAddressUpdateBlockedCookieKey);
        window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?sessionExpired=true`;
        setTimeout(() => {
            isLoading = false;
        }, 500);
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions,
    link: logoutLink.concat(httpLink),
});

if (!AuthoringUtils.isInEditor()) {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          if (isLoading) return Promise.reject(error);
          isLoading = true;
          new Cookies().remove(isAddressUpdateBlockedCookieKey);
          window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?sessionExpired=true`;
          setTimeout(() => {
            isLoading = false;
          }, 500);
        }
        return Promise.reject(error);
      }
    );
  }

axios.defaults.headers = {
    channel: "Web",
    country: `${globalConfigs.country}`,
    locale,
};

const modelClient = new LebaraModelClient();

const renderApp = () => {
  
  //get the errorPageRoot folder
  const errorPageRoot = PathUtils.getMetaPropertyValue('cq:errorpages') + '/';
  ModelManager.initialize({modelClient: modelClient, errorPageRoot: errorPageRoot}).then((pageModel) => {
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
