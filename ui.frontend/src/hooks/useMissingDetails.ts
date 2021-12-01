import { useSelector } from "react-redux";
import { CartItem } from "../redux/types/cartTypes";
import { selectFormValues } from "../redux/selectors/formsSelectors";
import { ReduxState } from "../redux/types";
import { selectIsAuthenticated } from "../selectors/userSelectors";
import { useHistory, useLocation } from "react-router-dom";
import { globalConfigs as GC, globalConstants as GCST } from "../GlobalConfigs";
function useMissingDetails() {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation<{
    isGuest?: boolean;
    willDoItLater?: boolean;
  }>();
  const willDoItLater = location?.state?.willDoItLater;
  const history = useHistory();
  const isGuest = location.state?.isGuest;
  const hasPrepaid = cartItems.some((t: CartItem) => t.isPrepaid);
  const hasPostpaid = cartItems.some((t: CartItem) => t.isPostPaid);
  const hasTopUpOrAddon = cartItems.some(
    (t: CartItem) => t.isTopUp || t.isAddon
  );
  const keepMobileFromAnotherOperator = 
 useSelector(selectFormValues("mobileFromAnotherOperator"))?.selectedValue ===
    1;
  const hasTopUpOrAddonAndNoPlanAndNotLoggedIn =
    !hasPrepaid && !hasPostpaid && !isAuthenticated && hasTopUpOrAddon;
  const postpaidPersonalDetails = useSelector(
    selectFormValues("postpaidPersonalDetails")
  );
  const portIn = useSelector(selectFormValues("portIn"));
  const personalDetails = useSelector(selectFormValues("personalDetails"));
  const missingDetailsForPostPaid =
    hasPostpaid && Object.keys(postpaidPersonalDetails).length === 0;
  const missingDetailsForPrepaid =
    (hasPrepaid && Object.keys(personalDetails).length === 0) ||
    (hasPrepaid &&
      keepMobileFromAnotherOperator &&
      Object.keys(portIn).length === 0 &&
      !willDoItLater);

  const isMissingDetails =
    !isGuest &&
    !isAuthenticated &&
      (!hasPrepaid && !hasPostpaid && !isAuthenticated && hasTopUpOrAddon);
  const isFreeTopUpAndFreeSim = cartItems.every(
    (t: CartItem) => t.isFreeSimTopup || t.isFreeSim
  );
      const handleRedirectsForMissingData = () => {
        if (hasTopUpOrAddonAndNoPlanAndNotLoggedIn) {
          history.push(GC.journeyPages[GCST.LOGIN] || '');
          return true;
        }
    
        if (missingDetailsForPrepaid) {
          history.push(GC.journeyPages[GCST.LEBARA_SIM_CHOICE] || '');
          return true;
        }
    
        if (missingDetailsForPostPaid) {
          history.push(GC.journeyPages[GCST.POSTPAID_DETAILS] || '');
          return true;
        }
    
        if (isFreeTopUpAndFreeSim) {
          history.push(GC.journeyPages[GCST.PERSONAL_DETAILS] || '');
          return true;
        }
        return false;
      };
  return {
    isGuest,
    isAuthenticated,
    keepMobileFromAnotherOperator,
    hasPrepaid,
    hasPostpaid,
    hasTopUpOrAddonAndNoPlanAndNotLoggedIn,
    personalDetails,
    portIn,
    postpaidPersonalDetails,
    missingDetailsForPostPaid,
    missingDetailsForPrepaid,
    isMissingDetails,
    isFreeTopUpAndFreeSim,
    handleRedirectsForMissingData
  };
}

export default useMissingDetails;
