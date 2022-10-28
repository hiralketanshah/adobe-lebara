import React from "react";
import { Flex, IconButton as ChakraIconButton, Text } from "@chakra-ui/react";
import { IconButtonProps } from "./types";
import { fontTypeDetails } from "../LebaraText/types";

const IconButton: React.FC<IconButtonProps> = ({
  bottomText,
  "aria-label": ariaLabel,
  icon,
  ...rest
}) => {
  const fontDetails = fontTypeDetails.button;

  const style = bottomText ? { padding: 26 } : {};
  const iconWithBottomText = (
    <Flex
      className="icon-button-wrapper"
      alignItems="center"
      flexDirection="column"
    >
      {icon}
      <Text
        mt="8px"
        fontSize={fontDetails.size}
        className="icon-button-bottom-text"
        fontWeight={fontDetails.weight}
      >
        {bottomText}
      </Text>
    </Flex>
  );

  return (
    <ChakraIconButton
      variant="ghost"
      _focus={{
        outline: "none",
      }}
      style={style}
      aria-label={ariaLabel}
      icon={bottomText ? iconWithBottomText : icon}
      {...rest}
    />
  );
};

export default IconButton;
