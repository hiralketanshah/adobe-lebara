import { TextProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface InfoBoxProps {
  description: string | ReactElement;
  textProps?: TextProps;
}
