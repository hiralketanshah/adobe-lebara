// @ts-nocheck
import React from "react";
import { Flex, Link, Image } from "@chakra-ui/react";
import { SocialMediaButtonsProps } from "./types";
import IconButton from "../IconButton/IconButton";

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ buttons }) => (
  <Flex justifyContent="space-between">
    {buttons?.map((buttonInfo, index) => (
      <IconButton
        color="white"
        key={index}
        aria-label={buttonInfo?.ariaLabel}
        variant="ghost"
        size="lg"
        as={Link}
        href={buttonInfo?.link}
        fontSize={buttonInfo.fontSize}
      >
        <Image src={buttonInfo?.label} height="16px" width="16px" />
      </IconButton>
    ))}
  </Flex>
);

export default SocialMediaButtons;
