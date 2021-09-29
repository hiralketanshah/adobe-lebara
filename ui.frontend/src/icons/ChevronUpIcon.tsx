import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const ChevronUpIcon = (props: IconProps) => (
  <Icon viewBox="0 0 93 93" {...props}>
    <g clipPath="url(#clip0)">
      <path d="M46.5012 19.993C48.1679 19.993 49.8345 20.6294 51.1052 21.8995L91.0931 61.8878C93.6368 64.4316 93.6368 68.5558 91.0931 71.0986C88.5504 73.6413 84.4269 73.6413 81.883 71.0986L46.5012 35.7147L11.1192 71.0973C8.57541 73.6401 4.45239 73.6401 1.90987 71.0973C-0.635116 68.5546 -0.635115 64.4303 1.90987 61.8866L41.8971 21.8983C43.1685 20.628 44.835 19.993 46.5012 19.993Z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="93"
          height="93"
          fill="white"
          transform="translate(93 93) rotate(-180)"
        />
      </clipPath>
    </defs>
  </Icon>
);

export default ChevronUpIcon;
