import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoLocationOutline, RiHeadphoneFill } from "react-icons/all";
import { LanguageHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
import lebaraColor from "../../color";

import { MenuWrapper, HeaderWrapper } from "./LanguageHeader.styles";

const LanguageHeader: React.FC<LanguageHeaderProps> = ({
  items,
  storeLink,
  storeTitle,
  helpLink,
  helpTitle,
}) => (
  <HeaderWrapper
    alignItems="center"
    px={10}
    justifyContent="flex-end"
    background={lebaraColor.lebaraBlue[200]}
    display="flex"
  >
    <Box color="#323d80">
      <LanguageDropDown options={items} />
    </Box>
    <MenuWrapper>
      {storeTitle && (
        <Flex alignItems="center" marginRight="12px" marginLeft="8px">
          <IconButton
            icon={<IoLocationOutline />}
            aria-label="Search"
            variant="ghost"
            size="sm"
            colorScheme="dark"
            color="white"
          />
          <a href={storeLink} style={{ textDecoration: "none" }}>
            <Text fontSize="12px" marginLeft="10px" color="white">
              {storeTitle}
            </Text>
          </a>
        </Flex>
      )}
      {helpTitle && (
        <Flex alignItems="center" marginRight="12px">
          <IconButton
            icon={<RiHeadphoneFill />}
            aria-label="Search"
            variant="ghost"
            size="sm"
            colorScheme="dark"
            color="white"
          />
          <a href={helpLink} style={{ textDecoration: "none" }}>
            <Text fontSize="12px" marginLeft="8px" color="white">
              {helpTitle}
            </Text>
          </a>
        </Flex>
      )}
    </MenuWrapper>
  </HeaderWrapper>
);

export default LanguageHeader;
