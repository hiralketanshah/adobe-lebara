// @ts-nocheck
import React from "react";
import { Flex, Link, Image } from "@chakra-ui/react";
import { SocialMediaButtonsProps } from "./types";
import IconButton from "../IconButton/IconButton";

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ 
  buttons,
  color,
}) => (
  <Flex justifyContent="space-between">
    {buttons?.map((buttonInfo, index) => (
      <IconButton
        key={index}
        aria-label={buttonInfo?.ariaLabel}
        variant="ghost"
        size="lg"
        as={Link}
        color={color === "white" ? "white" : "primary.800"}
        href={buttonInfo?.link}
        fontSize={buttonInfo.fontSize}
      >
        <Image src={buttonInfo?.label} height="16px" width="16px" />
      </IconButton>
    ))}
  </Flex>
);

export default SocialMediaButtons;
