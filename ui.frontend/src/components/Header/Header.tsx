import React, {useCallback, useRef, useState} from "react";
import {
  Box,
  Flex, Image,
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
import {useDispatch, useSelector} from "react-redux";

import {children, HeaderProps} from "./types";

import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import MiniHeader from "../MiniHeader/MiniHeader";
import {ReduxState} from "@lebara/ui/src/redux/types";
import NewSIMOfferCard from "@lebara/ui/src/components/NewSImOfferCard/NewSImOfferCard";
import Search from "../Search/Search";
import UserMenu from "@lebara/ui/src/components/UserMenu/UserMenu";
import {headerSearch} from "@lebara/ui/src/redux/actions/headerSearchActions";
import {selectIsAuthenticated} from "@lebara/ui/src/redux/selectors/userSelectors";
import {globalConfigs as GC} from "@lebara/ui/src/configs/globalConfigs.js";
import {useApolloClient, useQuery} from "@apollo/client";
import GET_CART from "@lebara/ui/src/graphql/GET_CART";
import {loadInitialCart, setCartItemsLoading} from "@lebara/ui/src/redux/actions/cartActions";
import mapMagentoProductToCartItem from "@lebara/ui/src/utils/mapMagentoProductToCartItem";
import {saveTopUps} from "@lebara/ui/src/redux/actions/topUpActions";
import GET_TOP_UPS from "@lebara/ui/src/graphql/GET_TOP_UPS";
import { useHistory, RouterLink } from "@lebara/ui/src/hooks/useHistory";
import PlanNotEligibleDialog from "@lebara/ui/src/components/PlanNotEligibleDialog/PlanNotEligibleDialog";
import { toggleDialogState } from "@lebara/ui/src/redux/actions/modalsActions";
import SearchResults from "../Search/SearchResults";
import aemUtils from "../../utils/aem-utils";
import { BACKGROUND_OPACITY_SAERCH_BAR } from "@lebara/ui/src/utils/lebara.constants";
import GoogleAnalytics from "@lebara/ui/src/GoogleAnalytics";
import useLoadPaymentMethods from "@lebara/ui/src/hooks/useLoadPaymentMethods";

const SingleMenu = ({ menuItem, newText }: { menuItem: children, newText: any }) => {
  const DEFUALT_GROUP_MENU_UPTO = 5;
  const history = useHistory();
  const timerRef = useRef<any>();
  const dispatch = useDispatch();
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
  
  const onCloseSearch = () => {
    dispatch(
      headerSearch({
        key: false,
      })
    );
  };

  const onMenuLinkNavigate = (url: any) => {
    if(!url) return null;
    return aemUtils.isCheckExternalLink(url) ? window.open(url, "_blank") : history.push(url);
  }

  const onSubMenuHeaderNavigate = (url: any) => {
    onCloseSearch();
    if(url) onMenuLinkNavigate(url);
  }

  return (
    <Menu
      isOpen={isOpenMenu}>
      <MenuButton
        onClick={() => onMenuLinkNavigate(menuItem?.url)}
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
            onClick={() => onMenuLinkNavigate(menuItem?.url)}
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
              display={"flex"}
              width={menuItem?.children?.length === (2 || 3 || 4 || 5) ? "25.3%" : "75%"}
              justifyContent={menuItem?.children?.length === 3 ? "start" : "space-between"}
              >
              {menuItem?.children?.map((subMenuOption: children, cgIdx: any) => {
                if(cgIdx<=DEFUALT_GROUP_MENU_UPTO-1) {
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
                        onClick={() => onSubMenuHeaderNavigate(subMenuOption?.url)}
                        marginRight={menuItem?.children?.length === (2 || 3 || 4 || 5) ? "8rem" : 0}
                        w={"100%"}
                        >
                        <Box>
                          {subMenuOption.children?.map(
                            (menuProps: children, cIdx: any) => (
                              <MenuItem
                                isDisabled={menuProps.active}
                                onClick={() => onMenuLinkNavigate(menuProps?.url)}
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
  topupCtaText,
  logoLinkURL,
  topupCtaLink,
  logoutLabel,
  loggedInMenuItems,
  search,
}) => {
  const ref = React.useRef<any>(undefined);
  const isHeaderSearchClicked = useSelector(
    (state: ReduxState) => state?.headerSearchBox?.key
  );
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [isSearchOpened, setIsSearchOpened] = React.useState(false);
  const [isProfileDropdownOpen, setProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isModalOpen = useSelector((t: ReduxState) => t.modal.open);
  const [isQuerySearched, setQuerySearched] = useState('');
  const [results, setResults] : any = useState([]);
  const { loadPaymentMethodsCallback } = useLoadPaymentMethods();
  useOutsideClick({
    ref,
    handler: () => setProfileDropdown(false),
  });

  const onHandleSearchQuery = ({ isQuery, results }: any) => {
    setQuerySearched(isQuery);
    setResults([...results]);
  }

  const onSearchClick = () => {
    setIsSearchOpened(true);
    dispatch(
      headerSearch({
        key: true,
      })
    );
  };

  const handleSearchOverlay = (isHeaderSearchClicked: boolean) => {
    const parentGridNodes = document.querySelectorAll<HTMLElement>('.aem-page > div > .aem-container > .aem-GridColumn') || document.querySelectorAll<HTMLElement>('.aem-page > .aem-container > .aem-GridColumn');
    if(!parentGridNodes || !parentGridNodes.length) return;
  
    parentGridNodes.forEach((ele, idx) => {
      if(idx > 0 && (ele && ele?.style) && idx <= parentGridNodes.length-1) {
        ele.style.opacity = isHeaderSearchClicked ? BACKGROUND_OPACITY_SAERCH_BAR : "1";
        ele.style.pointerEvents = isHeaderSearchClicked ? "none" : "initial";
      }
    });
  }

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

  const handleCartClick = () => {
    onCloseSearch();
    history.push(cartItems.length === 0 ?"/empty-cart"  : "/order-details");
  };

  const handleProfileClick = () => {
    onCloseSearch();
    if (isAuthenticated) {
      setProfileDropdown(!isProfileDropdownOpen);
      return;
    }
    
    history.push("/register", {
      fromHeader: true,
    });
  };

  React.useEffect(() => {
    handleSearchOverlay(isHeaderSearchClicked);
  }, [isHeaderSearchClicked]);


  React.useEffect(() => {
    if (cartItems.length === 0) {
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

  React.useEffect(() => {
    loadPaymentMethodsCallback();
  }, [loadPaymentMethodsCallback, isAuthenticated]);

  React.useEffect(() => {
    if(isHeaderSearchClicked) onCloseSearch();
  },[history?.location?.pathname]);
  
  return (
    <>
      <GoogleAnalytics />

      <Flex
          flexDirection="column"
          backgroundColor={{ md: "white" }}
          boxShadow={{ md: "8px 4px 15px 3px rgba(0, 0, 0, 0.04)" }}
          borderRadius={{ md: "8px" }}
          id="headerComp"
      >

        <PlanNotEligibleDialog
            open={isModalOpen}
            onClose={() => dispatch(toggleDialogState(false))}
        />
        <Flex display={{ base: "none", md: "none", lg: "none", xl: "block" }}>
          <Flex
              alignItems="center"
              px={{lg: "20px", xl: "50.88px"}}
              py={{ lg: "12px", md: "6px" }}
              background="lightenPrimary.500"
              color="white"
              height="95px"
              borderBottom="none"
          >
            <ChakraLink>
              <RouterLink to={logoLinkURL || "/"}>
                <Image
                    src={logoPath}
                    minW={75}
                    h="37px"
                    w={{lg: "80px", xl: "116.84px"}}
                    alt="logo"
                />
              </RouterLink>
            </ChakraLink>

            <Flex alignItems="left" ml={{ xl: "60px", lg: "40px", md: "15px" }}  gridGap={{lg: "20px", xl: "30px"}}>
              {items?.map((menuItem: children) => (
                  <React.Fragment key={menuItem.title}>
                    <SingleMenu menuItem={menuItem} newText={newText} />
                  </React.Fragment>
              ))}
            </Flex>
            <Spacer />
            <Box>
              <Button
                  w={{lg: "100px", xl: "130px"}}
                  fontSize={{ lg: "14px", md: "12px" }}
                  onClick={() => history.push("/top-up")}
              >
                {topupCtaText}
              </Button>
            </Box>
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
                          paddingLeft={{ lg: "35px!important", md: "26px!important" }}
                          colorScheme="dark"
                      />
                    </Button>
                ) : (
                    <Search
                        {...search}
                        onHandleSearchQuery={onHandleSearchQuery}
                        onCloseClick={onCloseSearch}
                        isHeaderSearchInput={true}
                        showSearchResults={false}
                        searchValue={isQuerySearched}
                    />
                )}
              </Box>
              <IconButton
                  colorScheme="dark"
                  icon={<AiOutlineUser size={24} />}
                  px={{ lg: "20px!important", md: "13px!important" }}
                  aria-label="Profile"
                  size="md"
                  variant="ghost"
                  onClick={handleProfileClick}
              />
              <Box pos="relative" onClick={handleCartClick}>
                <IconButton
                    p="absolute"
                    px={{ lg: "20px!important", md: "13px!important" }}
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
                className="wrapper-search-key-outside-header"
            >
              <Flex
                  zIndex="3"
                  width="17.5rem"
                  // ml="calc(100vw - 32.5rem)"
                  right={{ lg: "13.5rem", md: "4rem" }}
                  position="absolute"
                  flexDirection="column"
              >
                <SearchResults
                    {...search}
                    key={'search-comp-key-outside-header'+isQuerySearched}
                    queryVal={isQuerySearched}
                    results={results}
                    links={search?.links}
                    onCloseClick={onCloseSearch}
                />
              </Flex>
            </Box>
        )}
        {isProfileDropdownOpen && isAuthenticated && (
            <Box backgroundColor="white" width="100%" height="100%" ref={ref}>
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
                <UserMenu menus={loggedInMenuItems as any} logoutLabel={logoutLabel} logoutLink={logoLinkURL}/>
              </Flex>
            </Box>
        )}
        <Flex display={{ xl: "none", lg: "flex", md: "flex", sm: "flex" }} mx={{ xl: "27px" }}>
          <MiniHeader loggedInMenuItems={loggedInMenuItems}
                      topupCtaText={topupCtaText}
                      topupCtaLink={topupCtaLink}
                      logoutLabel={logoutLabel}
                      logoutLink={logoLinkURL}
                      logoPath={logoPath}
                      logoLinkURL={logoLinkURL} items={items}
                      search={search} />
        </Flex>
      </Flex>
    </>
  );
};

export default Header;