import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface ReviewSliderNextIconProps extends IconProps {
  isDisabled?: boolean;
}

const ReviewSliderNextIcon = ({
  isDisabled,
  ...props
}: ReviewSliderNextIconProps) => (
  <Icon viewBox="0 0 14 24" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.11425 23.498C0.461967 22.8285 0.461911 21.7431 1.11412 21.0736L9.95425 11.999L1.11425 2.92653C0.461967 2.2571 0.461911 1.17167 1.11412 0.502164C1.76633 -0.167342 2.82383 -0.167399 3.47611 0.502037L13.4972 10.7867C13.8104 11.1081 13.9864 11.5442 13.9864 11.9988C13.9864 12.4535 13.8105 12.8895 13.4973 13.211L3.47623 23.4978C2.82402 24.1673 1.76653 24.1674 1.11425 23.498Z"
      fill="#3D4998"
    />
  </Icon>
);

export default ReviewSliderNextIcon;
