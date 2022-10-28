import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const ChevronDownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 99 99" {...props}>
    <g clipPath="url(#clip0)">
      <path d="M49.4988 77.7172C47.7245 77.7172 45.9504 77.0397 44.5977 75.6877L2.02995 33.1195C-0.677914 30.4116 -0.677913 26.0213 2.02995 23.3145C4.73672 20.6077 9.12619 20.6077 11.8343 23.3145L49.4988 60.9812L87.1635 23.3158C89.8714 20.6091 94.2604 20.6091 96.9669 23.3158C99.6761 26.0226 99.6761 30.4129 96.9669 33.1208L54.3998 75.689C53.0464 77.0413 51.2724 77.7172 49.4988 77.7172Z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="99" height="99" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export default ChevronDownIcon;
