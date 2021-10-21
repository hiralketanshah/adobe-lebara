import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { highlightButton } from "../../redux/actions/highlightActions";
import LoginTabsComponent from "./LoginTabs";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";

const LoginRoute: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<{ isPasswordResetSucessfull?: boolean }>();

  useEffect(
    () =>
      history.listen(() => {
        if (history.action === "POP") {
          dispatch(
            highlightButton({
              key: 0,
            })
          );
        }
      }),
    [dispatch, history]
  );
  return (
    <BuyPlanLayout hideButton noPadding>
      <Box p={{ base: "20px", lg: 0 }} pt={{ lg: "89px" }} pb={{ lg: "164px" }}>
        <LoginTabsComponent
          isPasswordResetSucessfull={location.state?.isPasswordResetSucessfull}
        />
      </Box>
    </BuyPlanLayout>
  );
};
export default LoginRoute;
