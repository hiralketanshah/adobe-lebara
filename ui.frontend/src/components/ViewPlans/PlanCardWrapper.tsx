//@ts-nocheck
import React from "react";
import { Box } from "@chakra-ui/react";
import { PlanCardProps, offerProps } from "./types";
import ViewPlans from "./ViewPlans";

const PlanCardWrapper: React.FC<PlanCardProps> = ({
  offers,
  buttonLabel,
  minutesField,
  unlimitedTextField,
}) => {
  return (
    <Box py={{ md: "50px", sm: "0px" }} px="15px">
      <Box mt="20px">
        {offers?.map((item: offerProps) => (
          <ViewPlans
            offer={item}
            buttonLabel={buttonLabel}
            unlimitedTextField={unlimitedTextField}
            minutesField={minutesField}
          />
        ))}
      </Box>
    </Box>
  );
};
export default PlanCardWrapper;
