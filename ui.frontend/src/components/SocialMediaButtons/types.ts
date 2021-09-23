import * as React from "react";
import { IconProps } from "@chakra-ui/react";

export interface SocialMediaButtonOption extends IconProps {
  icon?: React.ReactElement;
  ariaLabel?: string;
  link?: string;
  label?: string;
}

export interface SocialMediaButtonsProps {
  buttons: SocialMediaButtonOption[];
}
