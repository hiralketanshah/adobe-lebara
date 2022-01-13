import * as React from "react";
import { Redirect } from "react-router";
import { Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import { selectIsAuthenticated } from "@lebara/ui/src/redux/selectors/userSelectors";
import { selectIsLoading } from "@lebara/ui/src/redux/selectors/loadingSelectors";
import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import aemUtils from "./utils/aem-utils";
import {globalConstants as C } from "@lebara/ui/src/configs/globalConfigs.js";
import {AuthoringUtils} from "@adobe/aem-spa-page-model-manager";
declare let window:any;
function PrivateRoute({ WrappedComponent, routeProps, ...rest }: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  
  React.useEffect(() => {
    if(isLoading) {
      dispatch(setLoading(false));
    }
  },[history?.location?.pathname]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    (isAuthenticated || isLoading) || AuthoringUtils.isInEditor() || !aemUtils.isPrivatePage(location.pathname) ?
      <WrappedComponent {...rest} {...routeProps} /> :
      <Route
        {...rest}
        render={(props) =>
          <Redirect
            to={{
              pathname: (JSON.parse(window.lebaraGlobalConfigs.journeyPages)[C.REGISTER] || "/"),
              state: { from: props.location },
            }}
          />
        }
      />
  );
}

export default PrivateRoute;