import React, {useCallback, useRef, useState} from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import {AiOutlineUser, BiSearch, RiShoppingCartLine,} from "react-icons/all";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLocalStorage} from "@rehooks/local-storage";

import {children, HeaderProps} from "./types";

import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import MiniHeader from "../MiniHeader/MiniHeader";
import {ReduxState} from "@lebara/ui/src/redux/types";
import NewSIMOfferCard from "../NewSImOfferCard/NewSImOfferCard";
import Search from "../Search/Search";
import UserMenu from "../UserMenu/UserMenu";
import {headerSearch} from "@lebara/ui/src/redux/actions/headerSearchActions";
import {selectIsAuthenticated} from "@lebara/ui/src/redux/selectors/userSelectors";
import {globalConfigs as GC, globalConstants as GCST} from "../../GlobalConfigs";
import {useApolloClient, useQuery} from "@apollo/client";
import GET_CART from "../../graphql/GET_CART";
import {loadInitialCart, setCartItemsLoading} from "@lebara/ui/src/redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import {saveTopUps} from "@lebara/ui/src/redux/actions/topUpActions";
import GET_TOP_UPS from "../../graphql/GET_TOP_UPS";
import GET_SESSION_STATUS from "../../graphql/GET_SESSION_STATUS";
import {saveUserInfo} from "@lebara/ui/src/redux/actions/userActions";
import {setLoading} from "@lebara/ui/src/redux/actions/loadingActions";
import {setPaymentMethods} from "@lebara/ui/src/redux/actions/paymentMethodsActions";

const SingleMenu = ({ menuItem, newText }: { menuItem: children, newText: any }) => {
  const history = useHistory();
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

  return (
    <Menu
      isOpen={isOpenMenu}>
      <MenuButton
        onClick={() => (menuItem.url ? history.push(menuItem.url) : null)}
        onMouseEnter={btnMouseEnterEvent}
        onMouseLeave={btnMouseLeaveEvent}
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
            onClick={() => history.push(`${menuItem.url}`)}
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
      {menuItem && menuItem?.children?.length !== 0 && 
        (<MenuList 
          marginLeft="-135px" 
          marginTop="5px" 
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
              justifyContent={menuItem?.children?.length === 3 ? "start" : "space-between"}
            >
              {menuItem?.children?.map((subMenuOption: children, cgIdx: any) => {
                if(cgIdx<=GCST.DEFUALT_GROUP_MENU_UPTO-1) {
                  return (<Box>
                      <MenuGroup
                        defaultValue="asc"
                        fontSize={14}
                        color="primary.500"
                        fontWeight="bold"
                        textTransform="uppercase"
                        marginLeft="12px"
                        title={subMenuOption?.title}
                        className="menu-group-heading"
                        cursor={subMenuOption?.url ? 'pointer' : 'default'}
                        onClick={() =>
                          subMenuOption?.url
                             && history.push(subMenuOption?.url)
                        }
                        marginRight={menuItem?.children?.length === 2 || 3 ? "8rem" : 0}
                        >
                        <Box>
                          {subMenuOption.children?.map(
                            (menuProps: children, cIdx: any) => (
                              <MenuItem
                                isDisabled={menuProps.active}
                                onClick={() =>
                                  menuProps.url
                                    ? history.push(menuProps.url)
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
                                      {newText || 'New'}
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
                    </Box>);
                } else {
                  return null;
                }
              })}
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
        </MenuList>)
      }
    </Menu>
  );
};

const Header: React.FC<HeaderProps> = ({
  logoPath,
  items,
  newText,
  accountLink,
  topupCtaText,
  logoLinkURL,
  topupCtaLink,
  logoutLabel,
  loggedInMenuItems,
}) => {
  const ref = React.useRef<any>(undefined);
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [userToken] = useLocalStorage("userToken");
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [isSearchOpened, setIsSearchOpened] = React.useState(false);
  const [isProfileDropdownOpen, setProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useOutsideClick({
    ref,
    handler: () => setProfileDropdown(false),
  });

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

  const loadPaymentMethods = useCallback(() => {
    fetch(`${GC.apiHostUri}/payments/adyen/paymentMethods`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        channel: "Web",
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          dispatch(setPaymentMethods(res));
        });
  }, [dispatch]);

  React.useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);

  React.useEffect(() => {
    if( cartItems.length === 0){
      getCart();
    }
    client
      .query({
        query: GET_SESSION_STATUS,
      })
      .then((res) => {
        dispatch(saveUserInfo(res.data.getSessionStatus));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
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
        <Flex
          alignItems="center"
          px={{ lg: "30px", md: "11px" }}
          py={{ lg: "12px", md: "6px" }}
          background="lightenPrimary.500"
          color="white"
        >
          <ChakraLink>
            <Link to={logoLinkURL || "/"}>
              <img src={logoPath} alt="Logo" />
            </Link>
          </ChakraLink>

          <Flex alignItems="left" ml={{ lg: "30px", md: "15px" }}>
            {items?.map((menuItem: children, idx: any) => (
              <React.Fragment key={menuItem.title}>
                <SingleMenu menuItem={menuItem} newText={newText} />
              </React.Fragment>
            ))}
          </Flex>
          <Spacer />
          <Box>
            <Button
              fontSize={{ lg: "14px", md: "12px" }}
              onClick={() => history.push(`${topupCtaLink}`)}
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
            {loggedInMenuItems && <UserMenu menus={loggedInMenuItems} logoutLabel={logoutLabel} />}
          </Flex>
        </Box>
      )}
      <Flex display={{ md: "none", sm: "flex" }} mx={{ md: "27px" }}>
        <MiniHeader loggedInMenuItems={loggedInMenuItems} logoutLabel={logoutLabel} logoPath={logoPath} logoLinkURL={logoLinkURL} items={items} />
      </Flex>
    </Flex>
  );
};

export default Header;