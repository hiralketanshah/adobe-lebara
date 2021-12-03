//@ts-nocheck
import React from "react";
import { Box } from "@chakra-ui/react";
import { PlanCardProps, offerProps } from "./types";
import ViewPlans from "./ViewPlans";

const PlanCardWrapper: React.FC<PlanCardProps> = ({
  offers,
  buttonLabel,
}) => {
  return (
    <Box mt="20px">
      {offers?.map((item: offerProps) => (
        <ViewPlans
          offer={item}
          buttonLabel={buttonLabel}
          allowanceList={item?.allowanceList}
        />
      ))}
    </Box>
  );
};
export default PlanCardWrapper;
