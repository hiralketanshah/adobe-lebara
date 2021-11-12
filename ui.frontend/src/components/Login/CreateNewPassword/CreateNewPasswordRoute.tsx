import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { highlightButton } from "../../../redux/actions/highlightActions";
import { CreateNewPasswordSchema } from "../types";
import BuyPlanLayout from "../../../layouts/BuyPlanLayout";
import CreateNewPassword from "./CreateNewPassword";

const CreateNewPasswordRoute: React.FC<CreateNewPasswordSchema> = ({...createNewPwdProps}) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
        <CreateNewPassword
          {...createNewPwdProps}
        />
      </Box>
    </BuyPlanLayout>
  );
};
export default CreateNewPasswordRoute;
