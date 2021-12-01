import React, { useRef, useState, useCallback } from "react";
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
  RiShoppingCartLine,
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Search from "../Search/Search";
import UserMenu from "../UserMenu/UserMenu";
import userMenuProps from "../../utils/userMenuProps";
import { headerSearch } from "../../redux/actions/headerSearchActions";
import { selectIsAuthenticated } from "../../redux/selectors/userSelectors";
import { globalConfigs as GC, globalConstants as GCST } from "../../GlobalConfigs";
import { useApolloClient, useQuery } from "@apollo/client";
import GET_CART from "../../graphql/GET_CART";
import { setCartItemsLoading, loadInitialCart } from "../../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import { saveTopUps } from "../../redux/actions/topUpActions";
import GET_TOP_UPS from "../../graphql/GET_TOP_UPS";

const Header: React.FC<HeaderProps> = ({
  logoPath,
  items,
  topupCtaText,
  topupCtaLink,
  accountLink,
  searchPlaceholder,
}) => {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [userToken] = useLocalStorage("userToken");
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [isSearchOpened, setIsSearchOpened] = React.useState(false);
  const [isProfileDropdownOpen, setProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const timerRef = useRef<any>();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const btnMouseEnterEvent = () => {
    setIsOpenMenu(true);
  };

  const btnMouseLeaveEvent = () => {
    timerRef.current = window.setTimeout(() => {
      setIsOpenMenu(false);
    }, 150);
  };

  const menuListMouseEnterEvent = () => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    setIsOpenMenu(true);
  };

  const menuListMouseLeaveEvent = () => {
    setIsOpenMenu(false);
  };

  const onSearchClick = () => {
    setIsSearchOpened(true);
    dispatch(
      headerSearch({
        key: true,
      })
    );
  };
  const onCloseSearch = () => {
    setIsSearchOpened(false);
    dispatch(
      headerSearch({
        key: false,
      })
    );
  };
  const getCart = useCallback(() => {
    dispatch(setCartItemsLoading());
    client.query({ query: GET_CART }).then((res) => {
      dispatch(
        loadInitialCart(mapMagentoProductToCartItem(res.data.getCart.items))
      );
    });
  }, [client, dispatch]);

  React.useEffect(() => {
    if( cartItems.length === 0){
      getCart();
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const { data: topUps } = useQuery(GET_TOP_UPS, {
    variables: {
      country: GC.country,
    },
  });

  React.useEffect(() => {
    if (topUps) {
      dispatch(
        saveTopUps(
          topUps.getTopUps.map((t: string) => Number(t.replace("€", "")))
        )
      );
    }
  }, [topUps, dispatch]);
  const handleCartClick = () => {
    const hasDataPlan =
      cartItems.filter((t) => !t.isAddon && !t.duration.startsWith("Top-up"))
        .length > 0;
    history.push(
      cartItems.length === 0
        ? (GC.journeyPages[GCST.EMPTY_CART]  || '/')
        : userToken || !hasDataPlan
        ? userToken
          ? (GC.journeyPages[GCST.ORDER_DETAILS]  || '/')
          : (GC.journeyPages[GCST.LOGIN]  || '/')
        : (GC.journeyPages[GCST.LEBARA_SIM_CHOICE]  || '/')
    );
  };
  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileDropdown(!isProfileDropdownOpen);
      return;
    }
    history.push(GC.journeyPages[GCST.REGISTER]  || '/', {
      fromHeader: true,
    });
    // history.push((GC.journeyPages[GCST.LOGIN]  || '/'), {
    //   fromMenu: true,
    // })
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
            {items?.map((menuItem: children, idx: any) => (
              <Menu key={`menu-key-${idx}`}
                isOpen={isOpenMenu}>
                <MenuButton
                onClick={() => (menuItem.path ? history.push(menuItem.path) : null)}
                onMouseEnter={btnMouseEnterEvent}
                onMouseLeave={btnMouseLeaveEvent}
                  _active={{
                    borderBottom: "1px solid white",
                  }}
                  key={`menu-button-key-${idx}`}
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
                <MenuList marginLeft="-135px" marginTop="5px" 
                  zIndex={2}
                  onMouseEnter={menuListMouseEnterEvent}
                  onMouseLeave={menuListMouseLeaveEvent}>
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
                      {menuItem.children?.map((subMenuOption: children, cgIdx: any) => (
                        <Box>
                          <MenuGroup
                            key={`menu-child-group-key-${cgIdx}`}
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
                                (menuProps: children, cIdx: any) => (
                                  <MenuItem
                                    key={`menu-child-key-${cIdx}`}
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
            <Box>
              {!isSearchOpened ? (
                <Button
                  padding="initial"
                  bgColor="transparent"
                  _hover={{ bgColor: "transparent" }}
                  _active={{ bgColor: "transparent" }}
                  onClick={onSearchClick}
                >
                  <IconButton
                    className="header-search-icon"
                    icon={<BiSearch size={24} />}
                    aria-label="Search"
                    variant="ghost"
                    size="md"
                    paddingRight={{
                      lg: "26px!important",
                      md: "13px!important",
                    }}
                    paddingLeft={{ lg: "56px!important", md: "26px!important" }}
                    colorScheme="dark"
                  />
                </Button>
              ) : (
                <Search isHeaderSearchInput={true} />
              )}
            </Box>
            <IconButton
              colorScheme="dark"
              icon={<AiOutlineUser size={24} />}
              px={{ lg: "26px!important", md: "13px!important" }}
              aria-label="Profile"
              size="md"
              variant="ghost"
              onClick={handleProfileClick}
            />
            <Box pos="relative" onClick={handleCartClick}>
              <IconButton
                p="absolute"
                px={{ lg: "26px!important", md: "13px!important" }}
                colorScheme="dark"
                icon={<RiShoppingCartLine size={24} />}
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
      {isSearchOpened && (
        <Box
          backgroundColor="rgba(0,0,0,0.5)"
          width="100%"
          height="100%"
          display={{ base: "none", md: "block" }}
        >
          <Flex
            zIndex="3"
            width="17.5rem"
            // ml="calc(100vw - 32.5rem)"
            right={{ lg: "6.3rem", md: "4rem" }}
            position="absolute"
            flexDirection="column"
          >
            <Search
              isHeaderSearchInput={false}
              isHeaderSearchResult={true}
              onCloseClick={onCloseSearch}
              />
          </Flex>
        </Box>
      )}
      {isProfileDropdownOpen && (
        <Box backgroundColor="white" width="100%" height="100%">
          <Flex
            zIndex="3"
            width="18rem"
            ml="calc(100vw - 24rem)"
            position="absolute"
            flexDirection="column"
            background="white"
            w="360px"
            px="11px"
            mt="-20px"
            borderBottomRadius="12px"
          >
            <UserMenu {...userMenuProps} />
          </Flex>
        </Box>
      )}
      <Flex display={{ md: "none", sm: "flex" }} mx={{ md: "27px" }}>
        <MiniHeader logoPath={logoPath} items={items} />
      </Flex>
    </Flex>
  );
};

export default Header;