import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Image,
  Link as ChakraLink,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  BiMessageSquareDetail,
  BiSearch,
  BiShoppingBag,
  GiHamburgerMenu,
  RiShoppingCartLine,
} from "react-icons/all";
import { Link } from "react-router-dom";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import { useSelector } from "react-redux";
import { MiniHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";
import SideMenu from "../SideMenu/SideMenu";
import { ReduxState } from "@lebara/ui/src/redux/types";
import {selectIsAuthenticated} from "@lebara/ui/src/redux/selectors/userSelectors";
import Button from "../Button/Button";
import UserMenu from "@lebara/ui/src/components/UserMenu/UserMenu";
import Search from "../Search/Search";

const MiniHeader: React.FC<MiniHeaderProps> = ({
  logoPath,
  logoLinkURL,
  items,
  logoutLabel,
  logoutLink,
  loggedInMenuItems,
  topupCtaText,
  topupCtaLink,
  search,
}) => {
  const ref = React.useRef<any>(undefined);
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [isProfileDropdownOpen, setProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleCartClick = () => {
    history.push(cartItems.length === 0 ? "/empty-cart" : "/order-details");
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSearchOpened, setIsSearchOpened] = React.useState(false);
  const onSearchClick = () => {
    setIsSearchOpened(true);
  };
  const onCloseSearch = () => {
    setIsSearchOpened(false);
  };
  
  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileDropdown(!isProfileDropdownOpen);
      return;
    }
    history.push(("/register"), {
      fromHeader: true,
    });
  };
  useOutsideClick({
    ref,
    handler: () => setProfileDropdown(false),
  });
  const remapToSideMenuArr = (arr: any, parent: boolean) => {
    return arr?.map((k:any) => {
      let subItems = {};
      const icon = parent ? BiShoppingBag : BiMessageSquareDetail;
      const buttonIcon = parent ? BiShoppingBag : <BiMessageSquareDetail color="secondary.600" />;

      if(k && k.children) {
        subItems = remapToSideMenuArr(k.children, true);
      }

      return {
        icon: icon,
        buttonIcon,
        title: k.title,
        linkUrl: k.url || k.path,
        items: subItems,
      };
    });
  };

  const remappedItems = remapToSideMenuArr(items, true);
  
  return (
    <Box w="100%">
      <Flex
        height="56px"
        alignItems="center"
        pl="10px"
        justifyContent="space-between"
        background="lightenPrimary.500"
        color="white"
      >
        <Flex alignItems="center">
          <IconButton
            pr="16px"
            icon={<GiHamburgerMenu />}
            aria-label="Search"
            variant="ghost"
            colorScheme="dark"
            onClick={onOpen}
          />
          <ChakraLink ml={{ base: "4px" }} mr={{ base: "5px" }}>
            <Link to={logoLinkURL || "/"}>
              <Image src={logoPath} alt="Logo" minW={75} />
            </Link>
          </ChakraLink>
        </Flex>
        <Flex>
        <Button
            data-testid="top-up-btn"
            fontSize="12px"
            padding={2}
            bg="primary.500"
            onClick={() => {
              history.push(topupCtaLink || "/top-up");
              onCloseSearch();
            }}
            borderRadius="5"
            height="30px"
            mt="8px"
          >
            {topupCtaText}
          </Button>
        {!isSearchOpened ? (
            <Box ml="20px">
              <Button
                onClick={onSearchClick}
                padding="initial"
                variant="unstyled"
              >
                <IconButton
                  icon={<BiSearch />}
                  aria-label="Search"
                  variant="ghost"
                  fontSize={20}
                  size="20px"
                  paddingRight={{ lg: "26px!important", md: "13px!important" }}
                  paddingLeft={{ lg: "56px!important", md: "26px!important" }}
                  colorScheme="dark"
                />
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <IconButton
            ml="20px"
            colorScheme="dark"
            icon={<AiOutlineUser />}
            fontSize={20}
            size="20px"
            aria-label="Profile"
            onClick={handleProfileClick}
            variant="ghost"
          />
          <Box pos="relative" onClick={handleCartClick}>
            <IconButton
              ml="20px"
              height="45px"
              fontSize={20}
              colorScheme="dark"
              icon={<RiShoppingCartLine />}
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
                borderRadius="20px"
                w="12px"
                textAlign="center"
              >
                {cartItems.length}
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
      {isSearchOpened ? (
        <Flex
          bgColor="lightenPrimary.500"
          position="absolute"
          zIndex="2"
          backgroundColor="rgba(0,0,0,0.5)"
          height="100%"
          width="100%"
        >
          <Search
            {...search}
            onCloseClick={onCloseSearch}
          />
        </Flex>
      ) : (
        <></>
      )}
      {isProfileDropdownOpen && isAuthenticated ? (
        <Box backgroundColor="white" width="100%" height="100%" ref={ref}>
          <Flex
            zIndex="3"
            width="18rem"
            ml="0px"
            position="absolute"
            flexDirection="column"
            background="white"
            w="100%"
            px="11px"
            borderBottomRadius="12px"
          >
            <UserMenu menus={loggedInMenuItems as any} logoutLabel={logoutLabel} logoutLink={logoutLink} />
          </Flex>
        </Box>
      ) : (
        <></>
      )}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerBody p={0}>
            <SideMenu items={remappedItems} onClose={onClose} topupCtaText={topupCtaText} topupCtaLink={topupCtaLink} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
