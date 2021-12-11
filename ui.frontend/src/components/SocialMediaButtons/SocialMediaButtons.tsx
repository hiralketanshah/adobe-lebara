// @ts-nocheck
import React from "react";
import {Flex, Image} from "@chakra-ui/react";
import {SocialMediaButtonsProps} from "./types";
import IconButton from "../IconButton/IconButton";

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ 
  buttons,
  color,
}) => (
    <Flex gridGap={{lg: "40px"}} justifyContent={{base: "space-between", lg: "initial"}}>
    {buttons?.map((buttonInfo, index) => (
      <IconButton
    key={index}
    icon={<Image src={buttonInfo?.label} height="24px" width="24px" />}
    aria-label={buttonInfo?.ariaLabel}
    variant="unstyled"
    _focus={{
      outline: 0
    }}
    size="24px"
    color={color === "white" ? "white" : "primary.800"}
    href={buttonInfo?.link}
    fontSize={buttonInfo.fontSize}
    />
    ))}
  </Flex>
);

export default SocialMediaButtons;
