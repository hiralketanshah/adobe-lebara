import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChoiceButtons from "../../components/ChoiceButtons/ChoiceButtons";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { highlightButton } from "../../redux/actions/highlightActions";
import { ReduxState } from "../../redux/types";
import useAddToCart from "../../hooks/useAddToCart";
import { MobileNumberPortProps } from "./types";
import { globalConfigs, globalConstants } from "../../GlobalConfigs";

const MobileFromAnotherOperatorChoiceRoute: React.FC<MobileNumberPortProps> = ({
  description,
  ctaOneLable,
  ctaTwoLable,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const highlightedButton = useSelector(
    (state: ReduxState) => state.highlightedButton.key
  );

  const [addItemToCart] = useAddToCart();
  useEffect(
    () =>
      history.listen(() => {
        if (history.action === "POP") {
          dispatch(
            highlightButton({
              key: 1,
            })
          );
        }
      }),
    [dispatch, history]
  );
  const cartItems = useSelector((state: ReduxState) => state.cart.items);

  return (
    <SelectNumberAndOrderDetailsLayout>
      <Box py="104px">
        <ChoiceButtons
          text={description}
          buttonOptions={[
            {
              key: 0,
              children: ctaOneLable,
              onClick: async () => {
                if (!cartItems.find((t) => t.id === 99999999)) {
                  await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
                }
                history.push((globalConfigs.journeyPages[globalConstants.SIM_PORT_IN]  || '/'));
              },
              variant: highlightedButton === 0 ? "outline" : "solid",
            },
            {
              key: 1,
              children: ctaTwoLable,
              variant: highlightedButton === 1 ? "outline" : "solid",
              onClick: async () => {
                if (!cartItems.find((t) => t.id === 99999999)) {
                  await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
                }
                history.push((globalConfigs.journeyPages[globalConstants.PERSONAL_DETAILS]  || '/'));
              },
            },
          ]}
        />
      </Box>
    </SelectNumberAndOrderDetailsLayout>
  );
};
export default MobileFromAnotherOperatorChoiceRoute;
