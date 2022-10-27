import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface PrevIconProps extends IconProps {
  isDisabled?: boolean;
}

const PrevIcon = ({ isDisabled, ...props }: PrevIconProps) => (
  <Icon viewBox="0 0 17 26" {...props}>
    <rect
      y="0.464844"
      width="17"
      height="25"
      rx="2"
      fill={isDisabled ? "#D8D8D8" : "#3D4998"}
    />
    <path
      d="M4.99881 12.9663C4.99881 12.7333 5.08777 12.5003 5.26532 12.3227L10.8551 6.73299C11.2107 6.37741 11.7872 6.37741 12.1426 6.73299C12.498 7.08843 12.498 7.66482 12.1426 8.02043L8.61078 11.552C7.82969 12.3331 7.82967 13.5995 8.61075 14.3805L12.1424 17.9121C12.4979 18.2677 12.4979 18.8441 12.1424 19.1995C11.787 19.5552 11.2105 19.5552 10.8549 19.1995L5.26515 13.6098C5.08757 13.4321 4.99881 13.1992 4.99881 12.9663Z"
      fill="white"
    />
  </Icon>
);

export default PrevIcon;
