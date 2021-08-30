import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import {
  AiOutlineUser,
  BiSearch,
  GiHamburgerMenu,
  RiShoppingBagLine,
} from "react-icons/all";
import { useHistory } from "react-router-dom";
import { MiniHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";

const MiniHeader: React.FC<MiniHeaderProps> = ({ accountLink, logoPath }) => {
  const history = useHistory();
  const handleCartClick = () => {
    history.push(`/`);
  };
  return (
    <Box w="100%">
      <Flex
        alignItems="center"
        px={4}
        justifyContent="space-between"
        background="lebaraBlue.500"
        color="white"
      >
        <Flex alignItems="center">
          <IconButton
            pr="16px"
            icon={<GiHamburgerMenu />}
            aria-label="Search"
            variant="ghost"
            colorScheme="dark"
            onClick={() => {}}
          />
          {logoPath && (
            <Link href="#">
              <img src={logoPath} alt="Logo" />
            </Link>
          )}
        </Flex>
        <Flex>
          <IconButton
            icon={<BiSearch />}
            aria-label="Search"
            variant="ghost"
            colorScheme="dark"
          />
          <Link href={accountLink} style={{ textDecoration: "none" }}>
            <IconButton
              colorScheme="dark"
              icon={<AiOutlineUser />}
              aria-label="Profile"
              variant="ghost"
            />
          </Link>
          <Box pos="relative" onClick={handleCartClick}>
            <IconButton
              p="absolute"
              colorScheme="dark"
              icon={<RiShoppingBagLine />}
              aria-label="Cart"
              variant="ghost"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MiniHeader;
