import * as React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@lebara/ui/src/redux/selectors/userSelectors";
import { selectIsLoading } from "@lebara/ui/src/redux/selectors/loadingSelectors";
import { useLocation } from 'react-router-dom';
import aemUtils from "./utils/aem-utils";
import { globalConfigs as GC, globalConstants as C } from "@lebara/ui/src/configs/globalConfigs.js";
import {AuthoringUtils} from "@adobe/aem-spa-page-model-manager";
function PrivateRoute({ WrappedComponent, routeProps, ...rest }: any) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  return (
    (isAuthenticated || isLoading) || AuthoringUtils.isInEditor() || !aemUtils.isForbiddenPage(location.pathname) ?
      <WrappedComponent {...rest} {...routeProps} /> :
      <Route
        {...rest}
        render={(props) =>
          <Redirect
            to={{
              pathname: (GC.journeyPages[C.REGISTER] || "/"),
              state: { from: props.location },
            }}
          />
        }
      />
  );
}

export default PrivateRoute;