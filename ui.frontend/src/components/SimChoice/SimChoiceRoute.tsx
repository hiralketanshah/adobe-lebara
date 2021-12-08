import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ChoiceButtons from "../../components/ChoiceButtons/ChoiceButtons";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { selectFormValues } from "../../redux/selectors/formsSelectors";
import { FormName } from "../../redux/types/formsTypes";
import {
  selectEmail,
  selectIsAuthenticated,
  selectMsisdn,
} from "../../redux/selectors/userSelectors";
import { ReduxState } from "../../redux/types";
import useAddToCart from "../../hooks/useAddToCart";
import { useHistory } from "react-router-dom";
import { SimChoiceProps } from "./types";
import { globalConfigs, globalConstants } from "../../GlobalConfigs";

const SimChoiceRoute: React.FC<SimChoiceProps> = ({
  description = "Do you already have a Lebara SIM?",
  ctaOneLable = "Yes, I Do",
  ctaTwoLable = "No, I don't",
  ctaOneLink = "",
  ctaTwoLink = "",
  formName = "simChoice",
}) => {
  const formValues = useSelector(selectFormValues("simChoice"));
  const selectedValue = formValues.selectedValue || 1;
  const [addItemToCart] = useAddToCart();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isMobileFromAnotherOperatorFlow = !!(formName === "mobileFromAnotherOperator");
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const msisdn = useSelector(selectMsisdn);
  const loggedInEmail = useSelector(selectEmail);
  return (
    <SelectNumberAndOrderDetailsLayout>
      <Box py="104px">
        <ChoiceButtons
          formName={formName ? formName as FormName : "simChoice"}
          text={description}
          buttonOptions={[
            {
              key: 1,
              variant: selectedValue === 2 ? "outline" : "solid",
              children: ctaOneLable,
              onClick: async () => {
                if(isMobileFromAnotherOperatorFlow) {
                  history.push(globalConfigs.journeyPages[
                    globalConstants.PERSONAL_DETAILS
                  ], {
                    toPortIn: true,
                  });
                }
                else  {
                  if (isAuthenticated && !msisdn) {
                    history.push(
                      globalConfigs.journeyPages[
                        globalConstants.VERIFY_REGISTER_MOBILE
                      ],
                      {
                        email: loggedInEmail,
                      }
                    );
                    return;
                  }
                  if (isAuthenticated) {
                    history.push(
                      globalConfigs.journeyPages[globalConstants.ORDER_DETAILS]
                    );
                    return;
                  }
                  history.push(
                    globalConfigs.journeyPages[globalConstants.LOGIN],
                    {
                      toPortIn: true,
                    }
                  );
                }
              },
            },
            {
              key: 2,
              children: ctaTwoLable,
              variant: selectedValue === 1 ? "outline" : "solid",
              onClick: async () => {
                if(isMobileFromAnotherOperatorFlow) {
                  if (!cartItems.find((t) => t.id === 99999999)) {
                    await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
                  }
                  history.push(globalConfigs.journeyPages[
                    globalConstants.PERSONAL_DETAILS
                  ]);
                } else {
                  history.push(globalConfigs.journeyPages[
                    globalConstants.MOBILE_NUMBER_FROM_OPERATOR
                  ]);
                }
              },
            },
          ]}
        />
      </Box>
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimChoiceRoute;
