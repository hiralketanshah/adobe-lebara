import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { IoLocationOutline, RiHeadphoneFill } from "react-icons/all";
import { LanguageHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";

const LanguageHeader: React.FC<LanguageHeaderProps> = ({
  items,
  storeLink,
  storeTitle,
  helpLink,
  helpTitle,
}) => (
  <Flex display={{ base: "none", md: "block" }}>
    <Flex
      alignItems="center"
      px={10}
      justifyContent="flex-end"
      background="lightenPrimary.200"
      color="white"
      display={{ base: "none", md: "flex" }}
    >
      <Box>
        <LanguageDropDown
          options={items}
          selectProps={{
            height: "2em",
          }}
        />
      </Box>

      {storeTitle && (
        <Link href={storeLink}>
        <Flex alignItems="center">
          <IconButton
            icon={<IoLocationOutline />}
            aria-label="Search"
            variant="ghost"
            size="sm"
            colorScheme="dark"
          />
          <Text fontSize="12px">{storeTitle}</Text>
        </Flex>
        </Link>
      )}

      {helpTitle && (
         <Link href={helpLink}>
        <Flex alignItems="center">
          <IconButton
            icon={<RiHeadphoneFill />}
            aria-label="Search"
            variant="ghost"
            size="sm"
            colorScheme="dark"
          />
          <Text fontSize="12px">{helpTitle}</Text>
        </Flex>
        </Link>
      )}
    </Flex>
  </Flex>
);

export default LanguageHeader;
