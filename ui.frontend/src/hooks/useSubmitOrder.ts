import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/selectors/userSelectors";
import useMissingDetails from "./useMissingDetails";
import { selectFormValues } from "../redux/selectors/formsSelectors";
import { useLocation } from "react-router-dom";

const { REACT_APP_HOST_URI } = process.env;

function useSubmitOrder() {
  const location = useLocation<{
    isGuest?: boolean;
    phoneNumber?: boolean;
    email?: string;
    bundlePlan: string;
  }>();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const {
    hasPrepaid,
    hasPostpaid,
    personalDetails,
    postpaidPersonalDetails,
    portIn,
    keepMobileFromAnotherOperator,
  } = useMissingDetails();
  const userDetails = isAuthenticated
    ? {}
    : hasPostpaid
    ? postpaidPersonalDetails
    : personalDetails;
  const portInDetails = location?.state?.isGuest
    ? {
        msisdn: location?.state?.phoneNumber,
      }
    : isAuthenticated
    ? {}
    : hasPrepaid && keepMobileFromAnotherOperator
    ? {
        dob: portIn.dob,
        msisdn: portIn.msisdn,
        previousProvider: portIn.previousProvider,
      }
    : hasPostpaid
    ? postpaidPersonalDetails.portIn
    : {};
  const { isMarketingEnabled } = useSelector(selectFormValues("order-details"));
  const marketingPreferences = isAuthenticated
    ? {}
    : hasPrepaid && keepMobileFromAnotherOperator
    ? {
        contactViaEmail: portIn.isConditionsAccepted,
        isContractAccepted: portIn.isContractAccepted,
        isPartnersAccepted: portIn.isPartnersAccepted,
        isMarketingEnabled: isMarketingEnabled ?? portIn.isMarketingEnabled,
      }
    : postpaidPersonalDetails.portInStatus === "Yes"
    ? {
        isConditionsAccepted: userDetails.isConditionsAccepted,
        isContractAccepted: userDetails.isContractAccepted,
        isPartnersAccepted: userDetails.isPartnersAccepted,
        isMarketingEnabled,
      }
    : {};

  const submitOrder = (stateData: any, formUserDetails?: any) => {
    const finalUserDetails: any = formUserDetails ?? userDetails;
    return fetch(`${REACT_APP_HOST_URI}/payments/adyen/payments`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        channel: "Web",
        country: "DE",
        userType: "Registered",
        marketingPreferences,
        personalDetails: {
          firstName: finalUserDetails.firstName,
          lastName: finalUserDetails.lastName,
          emailId: location.state?.isGuest
            ? location?.state.email
            : finalUserDetails.email,
        },
        password: finalUserDetails.password,
        portIn: portInDetails,
        addresses: [
          {
            address1: finalUserDetails.streetName,
            address2: finalUserDetails.houseNumber,
            city: finalUserDetails.townCity,
            postcode: finalUserDetails.zipCode,
            addition: finalUserDetails.addition,
          },
        ],
        ...stateData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return {
    userDetails,
    submitOrder,
    portIn,
  };
}

export default useSubmitOrder;
