import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ChoiceButtons from "../../components/ChoiceButtons/ChoiceButtons";
import SelectNumberAndOrderDetailsLayout from "../../layouts/SelectNumberAndOrderDetailsLayout";
import { SimChoiceProps } from "./types";
import { useHistory } from "react-router-dom";
import { selectFormValues } from "../../redux/selectors/formsSelectors";
import { FormName } from "../../redux/types/formsTypes";

const SimChoiceRoute: React.FC<SimChoiceProps> = ({
  description,
  ctaOneLable,
  ctaTwoLable,
  ctaOneLink,
  ctaTwoLink,
  formName
}) => {
  const history = useHistory();
  const formValues = useSelector(selectFormValues("simChoice"));
  const selectedValue = formValues.selectedValue || 1;
const isMobileFromAnotherOperatorFlow = !!(formName === "mobileFromAnotherOperator");
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
                history.push(ctaOneLink, {
                  ...isMobileFromAnotherOperatorFlow ? {toPortIn: true} : {}
                });
              },
            },
            {
              key: 2,
              children: ctaTwoLable,
              variant: selectedValue === 1 ? "outline" : "solid",
              onClick: async () => {
                history.push(ctaTwoLink);
              },
            }
          ]}
        />
      </Box>
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimChoiceRoute;