import * as React from "react";
import { Redirect } from "react-router";
import { Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@lebara/core/redux/selectors/userSelectors";
import { selectIsLoading } from "@lebara/core/redux/selectors/loadingSelectors";
import aemUtils from "./utils/aem-utils";
import {globalConstants as C } from "@lebara/core/configs/globalConfigs";
import {AuthoringUtils} from "@adobe/aem-spa-page-model-manager";
declare let window:any;
function PrivateRoute({ WrappedComponent, routeProps, ...rest }: any) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const isSessionExpired = !!queryParams.get("sessionExpired");

  return (
    (isAuthenticated || isLoading) || AuthoringUtils.isInEditor() || !aemUtils.isPrivatePage(location.pathname) ?
      <WrappedComponent {...rest} {...routeProps} /> :
      <Route
        {...rest}
        render={(props) =>
          <Redirect
            to={{
              pathname: (JSON.parse(window.lebaraGlobalConfigs.journeyPages)[C.REGISTER] || "/"),
              state: { from: props.location, sessionExpired: isSessionExpired ? true : "" },
              search: props.location.search
            }}
          />
        }
      />
  );
}

export default PrivateRoute;