import React from "react";
import { AwardsProps } from "./types";

const Award: React.FC<AwardsProps> = () => {
console.log("Awards Component")
  return (
    <>Awards Component
    {awardTitle}
    </>
  );
};

export default Award;