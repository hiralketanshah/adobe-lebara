import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const HamburgerIcon = (props: IconProps) => (
  <Icon viewBox="0 0 117 117" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 7C0 3.13401 3.05765 0 6.82946 0H126.171C129.942 0 133 3.13401 133 7C133 10.866 129.942 14 126.171 14H6.82946C3.05765 14 0 10.866 0 7Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 46.5C0 42.9101 3.05765 40 6.82946 40H126.171C129.942 40 133 42.9101 133 46.5C133 50.0899 129.942 53 126.171 53H6.82946C3.05765 53 0 50.0899 0 46.5Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 86C0 82.134 3.05765 79 6.82946 79H126.171C129.942 79 133 82.134 133 86C133 89.866 129.942 93 126.171 93H6.82946C3.05765 93 0 89.866 0 86Z"
      fill="white"
    />
  </Icon>
);

export default HamburgerIcon;
