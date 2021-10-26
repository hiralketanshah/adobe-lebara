import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ChoiceButtons from "../../components/ChoiceButtons/ChoiceButtons";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { ReduxState } from "../../redux/types";
import { highlightButton } from "../../redux/actions/highlightActions";
import { SimChoiceProps } from "./types";
import { useHistory } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";

const SimChoiceRoute: React.FC<SimChoiceProps> = ({
  description,
  ctaOneLable,
  ctaTwoLable,
  ctaOneLink,
  ctaTwoLink,
  isAddFreeSimtoCart
}) => {
  const [addItemToCart] = useAddToCart();
  const history = useHistory();
  const dispatch = useDispatch();
  const highlightedButton = useSelector(
    (state: ReduxState) => state.highlightedButton.key
  );
  useEffect(() => {
    if (isAddFreeSimtoCart) {
      return history.listen(() => {
        if (history.action === "POP") {
          dispatch(
            highlightButton({
              key: 1,
            })
          );
        }
      })
    }
    else {
      dispatch(
        highlightButton({
          key: 0,
        })
      )
    }
  }, [dispatch, history]);

  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const addtoCart = async () => {
    if (!cartItems.find((t) => t.id === 99999999)) {
      await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
    }
  };
  return (
    <SelectNumberAndOrderDetailsLayout>
      <Box py="104px">
        <ChoiceButtons
          text={description}
          buttonOptions={[
            {
              key: 0,
              variant: highlightedButton === 0 ? "outline" : "solid",
              children: ctaOneLable,
              ...(isAddFreeSimtoCart ? {
                onClick: async () => {
                  addtoCart();
                  history.push(ctaOneLink);
                }
              } : { path: ctaOneLink }),
            },
            {
              key: 1,
              children: ctaTwoLable,
              variant: highlightedButton === 1 ? "outline" : "solid",
              ...(isAddFreeSimtoCart ? {
                onClick: async () => {
                  addtoCart();
                  history.push(ctaTwoLink);
                }
              } : { path: ctaTwoLink }),
            },
          ]}
        />
      </Box>
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimChoiceRoute;