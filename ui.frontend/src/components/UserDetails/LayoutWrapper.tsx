import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { useApolloClient } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChangePasswordSuccess from "./ChangePasswordSuccesMessage";

import { globalConfigs as GC} from "@lebara/ui/src/configs/globalConfigs.js";
import {
  selectEmail,
  selectIsAuthenticated,
  selectMsisdn,
} from "@lebara/ui/src/redux/selectors/userSelectors";

import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import GET_PERSONAL_DETAILS_USER_PROFILE from "@lebara/ui/src/graphql/GET_PERSONAL_DETAILS_USER_PROFILE";

import SingleFormContainer from "../../layouts/SingleFormContainer";
import { UserDetailsProps } from "./types";
import UserDetails from "./UserDetails";

const LayoutWrapper: React.FC<UserDetailsProps> = ({ ...rest }) => {

  const location = useLocation<{ passwordUpdated: boolean }>();
  const client = useApolloClient();
  const passwordUpdated = location?.state?.passwordUpdated;
  const msisdn = useSelector(selectMsisdn);
  const [isLoading, SetLoading] = React.useState(true);
  const [passwordUpdateModal, setPasswordUpdateModal] =
    React.useState(passwordUpdated);
  const [, setPersonalDetailsError] = React.useState("");
  const [userDetailsResponse, setUserDetailsResponse] = React.useState<UserDetailsProps>({});
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const history = useHistory();
  const USER_PROFILE= 'user-profile';
  React.useEffect(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  React.useEffect(() => {
    if (!passwordUpdated) {
      return;
    }

    history.replace(GC.journeyPages[`${USER_PROFILE}`], {
      passwordUpdated: false,
    });
  }, [history, passwordUpdated]);
  React.useEffect(() => {
    if (!isAuthenticated) return;
    client
      .query({
        query: GET_PERSONAL_DETAILS_USER_PROFILE,
        variables: {
          country: "DE",
          msisdn,
        },
      })
      .then((personalDetailsRes) => {
        if (personalDetailsRes.data.getPersonalDetails) {
          setUserDetailsResponse({
            userName:
              personalDetailsRes.data.getPersonalDetails?.name?.firstName || "",
            userSurname:
              personalDetailsRes.data.getPersonalDetails?.name?.lastName || "",
            streetName:
              personalDetailsRes.data.getPersonalDetails?.addresses[0].street ||
              "",
            houseNumber:
              personalDetailsRes.data.getPersonalDetails?.addresses[0]
                .houseNumber || "",
            postCode:
              personalDetailsRes.data.getPersonalDetails?.addresses[0]
                .postCode || "",
            city:
              personalDetailsRes.data.getPersonalDetails?.addresses[0].city ||
              "",
            alternateContactNumber:
              personalDetailsRes.data.getPersonalDetails?.contact || "",
            emailAddress: email,
            password: "********",
            informedEmail:
              personalDetailsRes.data.getPersonalDetails?.marketingConsent
                .email || false,
            informedSms:
              personalDetailsRes.data.getPersonalDetails?.marketingConsent
                .sms || false,
            informedPhone:
              personalDetailsRes.data.getPersonalDetails?.marketingConsent
                .phone || false,
            selectedPartnerEmail: true,
            selectedParterSms: true,
            userInfo: "https://bit.ly/ryan-florence",
          });
          SetLoading(false);
        } else if (personalDetailsRes.error) {
          setPersonalDetailsError(
            `Error in API response ${personalDetailsRes.error}`
          );
        }
      })
      .catch((error) => {
        setPersonalDetailsError(`Error in API response ${error}`);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [client, msisdn, email, dispatch, isAuthenticated]);

  return (
    <SingleFormContainer hideButton noPadding>
          {!isLoading ? (
            <Box width={{ base: "100%", lg: "auto" }} height="100%">
              <UserDetails {...userDetailsResponse} {...rest} />
            </Box>
          ) : (
            <Box width={{ base: "100%", lg: "auto" }} height="100%">
              <UserDetails {...userDetailsResponse} {...rest} />
            </Box>
          )}

        <ChangePasswordSuccess
          changePasswordSuccessMsg={rest?.changePasswordSuccessMsg}
          isOpen={passwordUpdateModal}
          onClose={() => setPasswordUpdateModal(false)}
        />
    </SingleFormContainer>
  );
};
export default LayoutWrapper;
