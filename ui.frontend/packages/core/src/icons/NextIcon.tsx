import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface NextIconProps extends IconProps {
  isDisabled?: boolean;
}

const NextIcon = ({ isDisabled, ...props }: NextIconProps) => (
  <Icon viewBox="0 0 17 26" {...props}>
    <rect
      y="0.464844"
      width="17"
      height="25"
      rx="2"
      fill={isDisabled ? "#D8D8D8" : "#3D4998"}
    />
    <path
      d="M13.4104 12.9649C13.4104 13.1979 13.3214 13.4308 13.1439 13.6085L7.5541 19.1982C7.19852 19.5537 6.62201 19.5537 6.26658 19.1982C5.91114 18.8427 5.91114 18.2663 6.26658 17.9107L9.7984 14.3791C10.5795 13.5981 10.5795 12.3317 9.79843 11.5506L6.26675 8.01901C5.91131 7.66343 5.91131 7.08709 6.26675 6.73169C6.62218 6.37594 7.19869 6.37594 7.55427 6.73169L13.144 12.3213C13.3216 12.499 13.4104 12.732 13.4104 12.9649Z"
      fill="white"
    />
  </Icon>
);

export default NextIcon;
