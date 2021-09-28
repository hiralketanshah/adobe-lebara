import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface TrustedShopsStarIconProps extends IconProps {
  percentage?: number;
}
const TrustedShopsStarIcon = ({
  percentage = 1,
  ...props
}: TrustedShopsStarIconProps) => (
  <Icon viewBox="0 0 16 15" {...props}>
    <defs>
      <linearGradient id={`percentage_${percentage}`}>
        <stop offset={percentage} stopColor="#ffdc0f" />
        <stop offset={1 - percentage} stopColor="#e5e5e5" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      d="M2.96579 14.9211L7.73684 0L12.5079 14.9211L0 5.69356H15.4737"
      fill={`url(#${`percentage_${percentage}`})`}
    />
  </Icon>
);

export default TrustedShopsStarIcon;
