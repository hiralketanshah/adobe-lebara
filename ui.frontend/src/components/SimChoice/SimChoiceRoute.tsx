import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ChoiceButtons from "../../components/ChoiceButtons/ChoiceButtons";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { ReduxState } from "../../redux/types";
import { highlightButton } from "../../redux/actions/highlightActions";
import { SimChoiceProps } from "./types";

const SimChoiceRoute: React.FC<SimChoiceProps> = ({
  description,
  ctaOneLable,
  ctaTwoLable,
}) => {
  const dispatch = useDispatch();
  const highlightedButton = useSelector(
    (state: ReduxState) => state.highlightedButton.key
  );
  useEffect(
    () => () => {
      dispatch(
        highlightButton({
          key: 0,
        })
      );
    },
    [dispatch]
  );

  return (
    <SelectNumberAndOrderDetailsLayout>
      <Box>
        <ChoiceButtons
          text={description}
          buttonOptions={[
            {
              key: 0,
              variant: highlightedButton === 0 ? "outline" : "solid",
              children: ctaOneLable,
              path: "/login",
            },
            {
              key: 1,
              children: ctaTwoLable,
              variant: highlightedButton === 1 ? "outline" : "solid",
              path: "/mobile-number-from-another-operator-choice",
            },
          ]}
        />
      </Box>
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimChoiceRoute;