import { IconButtonProps as ChakraIconButtonProps } from "@chakra-ui/react";

export interface IconButtonProps extends ChakraIconButtonProps {
  /**
   * Text to show under the icon
   */
  bottomText?: string;
  href?: string;
}
