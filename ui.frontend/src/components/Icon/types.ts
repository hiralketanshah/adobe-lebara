import { IconProps as ChakraIconProps } from "@chakra-ui/react";

export interface IconProps extends ChakraIconProps {
  icon: any;
  IconComp?: IconProps;
}
