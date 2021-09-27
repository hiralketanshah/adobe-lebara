import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { SocialMediaButtonsProps } from "./types";
import IconButton from "../../IconButton/IconButton";

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ buttons }) => (
  <Flex justifyContent="space-between">
    {buttons.map((buttonInfo) => (
      <IconButton
        color="white"
        key={buttonInfo.ariaLabel}
        aria-label={buttonInfo.ariaLabel}
        icon={buttonInfo.icon}
        variant="ghost"
        size="lg"
        as={Link}
        href={buttonInfo.href}
        fontSize={buttonInfo.fontSize}
      />
    ))}
  </Flex>
);

export default SocialMediaButtons;