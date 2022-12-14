import React, { useState, useCallback } from "react";
import {ChakraProvider, extendTheme, withDefaultColorScheme,} from "@chakra-ui/react";
import { AuthoringUtils } from "@adobe/aem-spa-page-model-manager";
import { Page, withModel } from "@adobe/aem-react-editable-components";
import { useApolloClient } from "@apollo/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import LoadingOverlay from "react-loading-overlay";
import ScrollToTop from "@lebara/core/ScrollToTop";

import GET_SESSION_STATUS from "@lebara/core/graphql/GET_SESSION_STATUS";
import GET_PERSONAL_DETAILS from "@lebara/core/graphql/GET_PERSONAL_DETAILS";
import { selectIsLoading } from "@lebara/core/redux/selectors/loadingSelectors";
import { setLoading } from "@lebara/core/redux/actions/loadingActions";
import { saveUserInfo } from "@lebara/core/redux/actions/userActions";
import { selectSocket } from "@lebara/core/redux/selectors/socketSelectors";
import TelemetryProvider from "@lebara/core/TelemetryProvider";
import colors from "./theme/colors";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import Fonts from "./Fonts";
import GoogleAnalytics from "@lebara/core/GoogleAnalytics";
import store from "@lebara/core/store";
import "./styles/richtext-new.style.scss"
import {
  selectIsAuthenticated,
  selectMsisdn,
} from "@lebara/core/redux/selectors";
import {
  saveFormDetails,
} from "@lebara/core/redux/actions";

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
const {
    REACT_APP_APPLICATION_INSIGHT_INSTRUMENTATION_KEY
} = process.env;

let storeUpdated = store;
let isSocketConnected = false;
let themeUpdated = theme;
export function withPageHook(Component, store, theme) {

  return function WrappedComponent(props) {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const socket = useSelector(selectSocket);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const msisdn = useSelector(selectMsisdn);
    const [emailValue, setEmailValue] = React.useState("");
    storeUpdated = store ? store : storeUpdated;
    themeUpdated = theme ? theme : themeUpdated;
    
    const fetchPersonalDetails = useCallback(() => {
      if (isAuthenticated) {
        client
          .query({
            query: GET_PERSONAL_DETAILS,
          })
          .then((personalDetailsRes) => {
            const personalDetails = personalDetailsRes.data.getPersonalDetails;
            const { firstName, lastName } = personalDetails?.name;
            const { street, houseNumber, city, postCode } =
              personalDetails?.addresses[0];
            const date = new Date(personalDetails.dateOfBirth);
            const day = date?.getDate();
            const month = date?.getMonth();
            const year = date?.getFullYear()?.toString();
            let convertedMsisdn = msisdn;
            if (msisdn) {
              convertedMsisdn = `0${convertedMsisdn?.slice(2)}`;
            }
            const postpaidPersonalDetailsDataResp = {
              firstName: firstName || "",
              lastName: lastName || "",
              email: emailValue || "",
              salutationText: personalDetails.title || "",
              portInNumber: convertedMsisdn || "",
              portInStatus: msisdn ? "Yes" : "No",
              day,
              month,
              year,
              houseNumber: houseNumber || "",
              townCity: city || "",
              streetName: street || "",
              zipCode: postCode || "",
              intialHouseNumber: houseNumber || "",
              intialPostcode: postCode || "",
            };
            dispatch(
              saveFormDetails({
                formName: "postpaidPersonalDetails",
                values: postpaidPersonalDetailsDataResp,
              })
            );
          })
  
          .catch(() => {})
          .finally(() => {
            dispatch(setLoading(false));
          });
      }
    }, [client, dispatch, emailValue, isAuthenticated, msisdn]);
    
    React.useEffect(() => {
      fetchPersonalDetails();
    }, [fetchPersonalDetails]);

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

class App extends Page {

  render() {
    const {isLoading} = this.props;

    return (
      <Provider store={storeUpdated}>
        <ChakraProvider theme={themeUpdated}>
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
              <TelemetryProvider
                  instrumentationKey={REACT_APP_APPLICATION_INSIGHT_INSTRUMENTATION_KEY}
              >
                  <ScrollToTop/>
                  <GoogleAnalytics/>
                  <Fonts/>
                  <div id="modelRootLoader" style={{display: 'none'}}>
                      <LoadingOverlay
                          active={true}
                          spinner={<ScaleLoader color="#00A6EB"/>}
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
              </TelemetryProvider>
          </LoadingOverlay>
        </ChakraProvider>
      </Provider>
    );
  }
}

export {App};