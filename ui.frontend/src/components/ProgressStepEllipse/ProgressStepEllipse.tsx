import React from "react";
import { Box } from "@chakra-ui/react";
import { ProgressStepEllipseProps } from "./types";
import StepEllipseIcon from "./StepEllipseIcon";

const ProgressStepEllipse: React.FC<ProgressStepEllipseProps> = ({
  number,
  isActive,
  isDisabled,
}) => {
  const color = isActive ? "primary.600" : "secondary.500";
  const opacity = isDisabled ? 0.2 : 1;

  return (
    <Box position="relative" opacity={opacity}>
      <StepEllipseIcon fill={color} />
      <Box
        as="p"
        fontSize={10}
        color="white"
        position="absolute"
        left="8.25px"
        top="13.25px"
        transform="translateX(-50%) translateY(-50%)"
      >
        {number}
      </Box>
    </Box>
  );
};

export default ProgressStepEllipse;
