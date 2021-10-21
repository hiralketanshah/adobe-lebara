import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Link as ChakraLink,
  MenuGroup,
  MenuItem,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  BiSearch,
  // IoLocationOutline,
  // RiHeadphoneFill,
  RiShoppingBagLine,
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocalStorage } from "@rehooks/local-storage";
import {
  HeaderProps,
  children
} from "./types";

import IconButton from "../IconButton/IconButton";
// import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
import Button from "../Button/Button";
import MiniHeader from "../MiniHeader/MiniHeader";
import { ReduxState } from "../../redux/types";
// import LebaraLogo from "../../assets/images/lebara-logo.svg";
import NewSIMOfferCard from "../NewSImOfferCard/NewSImOfferCard";
import { globalConfigs, globalConstants } from "../../GlobalConfigs";

const Header: React.FC<HeaderProps> = ({
  logoPath,
  items,
  topupCtaText,
  topupCtaLink,
  accountLink,
}) => {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [userToken] = useLocalStorage("userToken");

  const handleCartClick = () => {
    const hasDataPlan =
      cartItems.filter((t) => !t.isAddon && !t.duration.startsWith("Top-up"))
        .length > 0;
    history.push(
      cartItems.length === 0
        ? (globalConfigs.journeyPages[globalConstants.EMPTY_CART]  || '/')
        : userToken || !hasDataPlan
        ? userToken
          ? (globalConfigs.journeyPages[globalConstants.ORDER_DETAILS]  || '/')
          : (globalConfigs.journeyPages[globalConstants.LOGIN]  || '/')
        : (globalConfigs.journeyPages[globalConstants.LEBARA_SIM_CHOICE]  || '/')
    );
  };
  return (
    <Flex
      flexDirection="column"
      backgroundColor={{ md: "white" }}
      boxShadow={{ md: "8px 4px 15px 3px rgba(0, 0, 0, 0.04)" }}
      borderRadius={{ md: "8px" }}
    >
      <Flex display={{ base: "none", md: "block" }}>
        {/* <Flex
          alignItems="center"
          px={10}
          justifyContent="flex-end"
          background="lightenPrimary.200"
          color="white"
          display={{ base: "none", md: "flex" }}
        >
          <Box>
            <LanguageDropDown
              options={[]}
              selectProps={{
                height: "2em",
              }}
            />
          </Box>
          <Flex alignItems="center">
            <IconButton
              icon={<IoLocationOutline />}
              aria-label="Search"
              variant="ghost"
              size="sm"
              colorScheme="dark"
            />
            <Text fontSize="12px">Find a store</Text>
          </Flex>
          <Flex alignItems="center">
            <IconButton
              icon={<RiHeadphoneFill />}
              aria-label="Search"
              variant="ghost"
              size="sm"
              colorScheme="dark"
            />
            <Text fontSize="12px">Help</Text>
          </Flex>
        </Flex> */}

        <Flex
          alignItems="center"
          px={{ lg: "30px", md: "11px" }}
          py={{ lg: "12px", md: "6px" }}
          background="lightenPrimary.500"
          color="white"
        >
          <ChakraLink>
            <Link to="/">
              <img src={logoPath} alt="Logo" />
            </Link>
          </ChakraLink>

          <Flex alignItems="left" ml={{ lg: "30px", md: "15px" }}>
            {items?.map((menuItem: children) => (
              <Menu>
                <MenuButton
                  _active={{
                    borderBottom: "1px solid white",
                  }}
                >
                  <Box px={{ lg: "2px", md: "initial" }}>
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      _focus={{ borderBottom: "1px solid white" }}
                      _hover={{ color: "white", bg: "lightenPrimary.500" }}
                      size="sm"
                      pl="initial"
                      onClick={() => history.push(`"/"${menuItem.title}`)}
                      isDisabled={menuItem.active}
                    >
                      <Text
                        textTransform="capitalize"
                        fontSize={{ lg: "14px", md: "12px" }}
                        lineHeight="20px"
                        align="left"
                        color="white"
                        fontWeight="normal"
                      >
                        {menuItem.title}
                      </Text>
                    </Button>
                  </Box>
                </MenuButton>
                <MenuList marginLeft="-135px" marginTop="5px" zIndex={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="calc(100vw - 0px)"
                    padding="45px"
                  >
                    <Box
                      width="75%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      {menuItem.children?.map((subMenuOption: children) => (
                        <Box>
                          <MenuGroup
                            defaultValue="asc"
                            fontSize={14}
                            color="primary.500"
                            fontWeight="bold"
                            textTransform="uppercase"
                            marginLeft="12px"
                            title={subMenuOption.title}
                          >
                            <Box>
                              {subMenuOption.children?.map(
                                (menuProps: children) => (
                                  <MenuItem
                                    isDisabled={menuProps.active}
                                    onClick={() =>
                                      menuProps.path
                                        ? history.push(menuProps.path)
                                        : null
                                    }
                                  >
                                    <Text
                                      fontSize="14px"
                                      fontWeight="500"
                                      lineHeight="14.06px"
                                      color="black"
                                    >
                                      {menuProps.title}
                                    </Text>
                                    {menuProps.showNewText ? (
                                      <Tag
                                        size="md"
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="blue"
                                        marginLeft="20px"
                                      >
                                        <TagLabel
                                          fontSize="14px"
                                          fontWeight="700"
                                        >
                                          New
                                        </TagLabel>
                                      </Tag>
                                    ) : (
                                      <></>
                                    )}
                                  </MenuItem>
                                )
                              )}
                            </Box>
                          </MenuGroup>
                        </Box>
                      ))}
                    </Box>
                    <Box width="12%">
                      <></>
                    </Box>
                    <Box position="relative">
                      {(menuItem.imagePath || menuItem.simImage || menuItem.imageText) && (
                        <NewSIMOfferCard imagePath={menuItem.imagePath} simImage= {menuItem.simImage} imageText={menuItem.imageText}/>
                      )}
                    </Box>
                  </Box>
                </MenuList>
              </Menu>
            ))}
          </Flex>
          <Spacer />
          <Box>
            <Button
              fontSize={{ lg: "14px", md: "12px" }}
              onClick={() => history.push(`/${topupCtaLink}`)}
            >
              {topupCtaText}
            </Button>
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
            <IconButton
              colorScheme="dark"
              icon={<AiOutlineUser />}
              aria-label="Profile"
              size="md"
              variant="ghost"
              onClick={() => history.push(`/${accountLink}`)}
            />
            <Box pos="relative" onClick={handleCartClick}>
              <IconButton
                p="absolute"
                colorScheme="dark"
                icon={<RiShoppingBagLine />}
                aria-label="Cart"
                variant="ghost"
              />
              {cartItems.length > 0 && (
                <Text
                  pos="absolute"
                  bottom="4px"
                  right="12px"
                  fontWeight="bold"
                  color="white"
                  fontSize="10px"
                  backgroundColor="secondary.500"
                  borderRadius="24px"
                  w="12px"
                  textAlign="center"
                >
                  {cartItems.length}
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex display={{ md: "none", sm: "flex" }} mx={{ md: "27px" }}>
        <MiniHeader logoPath={logoPath} items={items}/>
      </Flex>
    </Flex>
  );
};

export default Header;
