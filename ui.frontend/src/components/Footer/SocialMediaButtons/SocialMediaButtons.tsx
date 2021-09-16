import React from "react";
import { Flex } from "@chakra-ui/react";
import { SocialMediaButtonsProps } from "./types";
import color from "../../../color";
import { SocialMediaButtonsWrapper } from "./SocialMediaButtons.styles";
const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ buttons }) => {
  return (
    <Flex justifyContent="space-between">
      {buttons?.map((buttonInfo) => (
        <a
          href={buttonInfo?.link}
          style={{
            color: color.lightenPrimary[500],
          }}
        >
          <SocialMediaButtonsWrapper h="48px" w="48px">
            <img src={buttonInfo?.label} height="16" width="16" alt="Alt text" />
          </SocialMediaButtonsWrapper>
        </a>
      ))}
    </Flex>
  );
};
export default SocialMediaButtons;
