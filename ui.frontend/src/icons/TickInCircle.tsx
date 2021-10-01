import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

interface TickInCircleInterface extends IconProps {
  tickFill?: string;
}

const TickInCircle = ({ tickFill, ...props }: TickInCircleInterface) => (
  <Icon viewBox="0 0 145 145" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M105.715 49.3112C107.431 51.0272 107.431 53.8093 105.715 55.5252L65.5613 95.679C63.8453 97.395 61.0632 97.395 59.3473 95.679L39.2704 75.6021C37.5544 73.8862 37.5544 71.1041 39.2704 69.3882C40.9863 67.6722 43.7684 67.6722 45.4844 69.3882L62.4543 86.3581L99.5012 49.3112C101.217 47.5953 103.999 47.5953 105.715 49.3112Z"
      fill={tickFill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.1842 72.5012C1.1842 33.2668 33.2668 1.1842 72.5012 1.1842C111.736 1.1842 143.818 33.2668 143.818 72.5012C143.818 111.736 111.736 143.818 72.5012 143.818C33.2668 143.818 1.1842 111.736 1.1842 72.5012ZM72.5012 9.97208C38.1202 9.97208 9.97208 38.1202 9.97208 72.5012C9.97208 106.882 38.1202 135.03 72.5012 135.03C106.882 135.03 135.03 106.882 135.03 72.5012C135.03 38.1202 106.882 9.97208 72.5012 9.97208Z"
    />
  </Icon>
);

export default TickInCircle;
