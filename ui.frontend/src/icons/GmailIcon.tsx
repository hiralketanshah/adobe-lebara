import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const GmailIcon = (props: IconProps) => (
  <Icon viewBox="0 0 90 68" {...props}>
    <g clipPath="url(#clip0)">
      <path
        d="M6.13639 67.5003H20.4546V32.7274L0 17.3865V61.3639C0 64.7594 2.75115 67.5003 6.13639 67.5003Z"
        fill="#4285F4"
      />
      <path
        d="M69.5457 67.5003H83.8639C87.2594 67.5003 90.0003 64.7491 90.0003 61.3639V17.3865L69.5457 32.7274"
        fill="#34A853"
      />
      <path
        d="M69.5457 6.13646V32.7275L90.0003 17.3865V9.20465C90.0003 1.61599 81.3377 -2.71016 75.2729 1.84099"
        fill="#FBBC04"
      />
      <path
        d="M20.2042 32.79V6.19897L44.7498 24.6081L69.2953 6.19897V32.79L44.7498 51.1991"
        fill="#EA4335"
      />
      <path
        d="M0 9.20343V17.3853L20.4546 32.7262V6.13524L14.7273 1.83977C8.65231 -2.71138 0 1.61477 0 9.20343"
        fill="#C5221F"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="90.0003" height="67.5002" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
export default GmailIcon;
