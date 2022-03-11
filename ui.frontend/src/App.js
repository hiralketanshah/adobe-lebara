import React, { useState } from "react";
import {ChakraProvider, extendTheme, withDefaultColorScheme,} from "@chakra-ui/react";
import { AuthoringUtils } from "@adobe/aem-spa-page-model-manager";
import { Page, withModel } from "@adobe/aem-react-editable-components";
import { useApolloClient } from "@apollo/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import LoadingOverlay from "react-loading-overlay";
import ScrollToTop from "@lebara/ui/src/ScrollToTop";

import GET_SESSION_STATUS from "@lebara/ui/src/graphql/GET_SESSION_STATUS";
import { selectIsLoading } from "@lebara/ui/src/redux/selectors/loadingSelectors";
import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import { saveUserInfo } from "@lebara/ui/src/redux/actions/userActions";
import { selectSocket } from "@lebara/ui/src/redux/selectors/socketSelectors";

import colors from "./theme/colors";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import store from "@lebara/ui/src/store";
import Fonts from "./Fonts";
import GoogleAnalytics from "@lebara/ui/src/GoogleAnalytics";
const theme = extendTheme(
  {
    // colors,
    // For DE customization we hardcoded the different color pattern
    // latter on we will decide on the bases of domain name which color pattern needs to be follow
    colors,
    fonts: {
      heading: "Chiswick Grotesque Lebara",
      body: "Roboto",
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

let isSocketConnected = false;
function withPageHook(Component) {

  return function WrappedComponent(props) {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const socket = useSelector(selectSocket);

    React.useEffect(() => {
      client
        .query({
          query: GET_SESSION_STATUS,
        })
        .then((res) => {
            if(socket && !isSocketConnected) {
                socket.auth = {
                    crmId: res.data.getSessionStatus.crmId,
                };
                isSocketConnected = true;
                socket.connect();
            }
            dispatch(saveUserInfo(res.data.getSessionStatus));
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setLoading(false));
          setIsAuthLoading(false);
        });
      
        return () => {}
    }, [client, dispatch, socket]);

    if (!AuthoringUtils.isInEditor() && isAuthLoading) {
      return (
        <LoadingOverlay
          active={isLoading}
          spinner={<ScaleLoader color="#00A6EB" />}
          styles={{
            overlay: (base) => ({
              ...base,
              position: "fixed",
              zIndex: 1401,
            }),
          }}
        />
      );
    }
    
    return <Component {...props} isLoading={isLoading} />;
  }
}

// This component is the application entry point
class App extends Page {

  render() {
    const {isLoading} = this.props;

    return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <LoadingOverlay
            active={!AuthoringUtils.isInEditor() ? isLoading : false}
            spinner={<ScaleLoader color="#00A6EB" />}
            styles={{
              overlay: (base) => ({
                ...base,
                position: "fixed",
                zIndex: 1401,
              }),
            }}
          >
            <ScrollToTop />
            <GoogleAnalytics />
            <Fonts />
            <div id="modelRootLoader" style={{display: 'none'}}>
              <LoadingOverlay
                active={true}
                spinner={<ScaleLoader color="#00A6EB" />}
                styles={{
                  overlay: (base) => ({
                    ...base,
                    position: "fixed",
                    zIndex: 1401,
                  }),
                }}
              />
            </div>
            {this.childComponents}
            {this.childPages}
          </LoadingOverlay>
        </ChakraProvider>
      </Provider>
    );
  }
}

export default withModel(withPageHook(App));
