import { IconProps } from "@chakra-ui/react";
import * as React from "react";

export interface ListProps {
  icon?: ((props: IconProps) => JSX.Element) | React.ReactElement;
  iconFill?: string;
  items: ListPlanItem[];
  textColor?: string;
}

export interface ListPlanItem {
  items: string[];
}