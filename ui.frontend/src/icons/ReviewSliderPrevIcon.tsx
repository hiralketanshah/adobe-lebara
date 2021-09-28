import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface ReviewSliderPrevIconProps extends IconProps {
  isDisabled?: boolean;
}

const ReviewSliderPrevIcon = ({
  isDisabled,
  ...props
}: ReviewSliderPrevIconProps) => (
  <Icon viewBox="0 0 15 24" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8526 0.502039C14.5048 1.17147 14.5049 2.2569 13.8527 2.92641L5.01255 12.001L13.8526 21.0735C14.5048 21.7429 14.5049 22.8283 13.8527 23.4978C13.2005 24.1673 12.143 24.1674 11.4907 23.498L1.46963 13.2133C1.1564 12.8919 0.980409 12.4558 0.980386 12.0012C0.980363 11.5465 1.1563 11.1105 1.46951 10.789L11.4906 0.502167C12.1428 -0.167339 13.2003 -0.167396 13.8526 0.502039Z"
      fill="#3D4998"
    />
  </Icon>
);

export default ReviewSliderPrevIcon;
