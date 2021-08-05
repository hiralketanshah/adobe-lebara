import React from "react";
import { IconButton as ChakraIconButton, Text } from "@chakra-ui/react";
import { IconButtonProps } from "./types";
import { fontTypeDetails } from "../LebaraText/types";

import {
  IconButtonWrapper,
  IconButtonBottomText,
} from "./IconButton.styles.js";

const IconButton: React.FC<IconButtonProps> = ({
  bottomText,
  "aria-label": ariaLabel,
  icon,
  ...rest
}) => {
  const fontDetails = fontTypeDetails.button;

  const style = bottomText ? { padding: 26 } : {};
  const iconWithBottomText = (
    <IconButtonWrapper>
      {icon}
      <IconButtonBottomText
        fontSize={fontDetails.size}
        fontWeight={fontDetails.weight}
      >
        {bottomText}
      </IconButtonBottomText>
    </IconButtonWrapper>
  );

  return (
    <ChakraIconButton
      variant="ghost"
      style={style}
      aria-label={ariaLabel}
      icon={bottomText ? iconWithBottomText : icon}
      {...rest}
    />
  );
};

export default IconButton;
