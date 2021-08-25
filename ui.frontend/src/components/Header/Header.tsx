import React from "react";
import { Box, Flex, Spacer, Text, Link } from "@chakra-ui/react";
import { AiOutlineUser, BiSearch, RiShoppingBagLine } from "react-icons/all";
import { useHistory } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import MiniHeader from "../MiniHeader/MiniHeader";

import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({
  items,
  logoPath,
  topupCtaText,
  topupCtaLink,
  accountLink,
}) => {
  const history = useHistory();
  return (
    <Flex
      flexDirection="column"
      backgroundColor={{ md: "white" }}
      boxShadow={{ md: "8px 4px 15px 3px rgba(0, 0, 0, 0.04)" }}
      borderRadius={{ md: "8px" }}
    >
      <Flex display={{ base: "none", md: "block" }}>
        <Flex
          alignItems="center"
          px={{ lg: "30px", md: "11px" }}
          py={{ lg: "12px", md: "6px" }}
          background="lebaraBlue.500"
          color="white"
        >
          <Flex alignItems="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logoPath} alt="Logo" />
            </Link>
          </Flex>

          <Flex alignItems="left" ml={{ lg: "30px", md: "15px" }}>
            <Box px={{ lg: "2px", md: "initial" }}>
              {items?.map(({ title, url }) => (
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  _hover={{ color: "white", bg: "lebaraBlue.500" }}
                  size="sm"
                  pl="initial"
                  onClick={() => history.push("/postpaid")}
                >
                  <Link href={url} style={{ textDecoration: "none" }}>
                    <Text
                      textTransform="capitalize"
                      fontSize={{ lg: "14px", md: "12px" }}
                      lineHeight="20px"
                      align="left"
                      color="white"
                      fontWeight="normal"
                    >
                      {title}
                    </Text>
                  </Link>
                </Button>
              ))}
            </Box>
          </Flex>
          <Spacer />
          <Box>
            <Link href={topupCtaLink} style={{ textDecoration: "none" }}>
              <Button fontSize={{ lg: "14px", md: "12px" }}>
                {topupCtaText}
              </Button>
            </Link>
          </Box>
          <Spacer />
          <Flex>
            <IconButton
              icon={<BiSearch />}
              aria-label="Search"
              variant="ghost"
              size="md"
              colorScheme="dark"
            />
            <Link href={accountLink} style={{ textDecoration: "none" }}>
              <IconButton
                colorScheme="dark"
                icon={<AiOutlineUser />}
                aria-label="Profile"
                size="md"
                variant="ghost"
              />
            </Link>
            <IconButton
              colorScheme="dark"
              icon={<RiShoppingBagLine />}
              aria-label="Cart"
              size="md"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex display={{ md: "none", sm: "flex" }} mx={{ md: "27px" }}>
        <MiniHeader logoPath={logoPath} accountLink={accountLink} />
      </Flex>
    </Flex>
  );
};

export default Header;
