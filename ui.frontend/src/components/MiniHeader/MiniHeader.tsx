import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Link as ChakraLink,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  BiMessageSquareDetail,
  BiSearch,
  BiShoppingBag,
  GiHamburgerMenu,
  RiShoppingCartLine,
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocalStorage } from "@rehooks/local-storage";
import { MiniHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
import SideMenu from "../SideMenu/SideMenu";
import { ReduxState } from "../../redux/types";
import { globalConfigs as GC, globalConstants as GCST } from "../../GlobalConfigs";
import Button from "../Button/Button";
import UserMenu from "../UserMenu/UserMenu";
import userMenuProps from "../../utils/userMenuProps";
// import LebaraLogo from "../../assets/images/lebara-logo.svg";
import Search from "../Search/Search";
import { selectIsAuthenticated } from "../../redux/selectors/userSelectors";

const MiniHeader: React.FC<MiniHeaderProps> = ({
  logoPath,
  items
}) => {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [userToken] = useLocalStorage("userToken");
  const [isProfileDropdownOpen, setProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);


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
    history.push((GC.journeyPages[GCST.REGISTER]  || '/'), {
      fromHeader: true,
    });
  };
  const remapToSideMenuArr = (arr: any, parent: boolean) => {
    return arr?.map((k:any) => {
      let subItems = {};
      const icon = parent ? BiShoppingBag : <BiMessageSquareDetail color="secondary.600" />;

      if(k && k.children) {
        subItems = remapToSideMenuArr(k.children, false);
      }

      return {
        icon: icon,
        title: k.title,
        linkUrl: k.path, 
        items: subItems,
      };
    });
  };

  const remappedItems = remapToSideMenuArr(items, true);
  
  return (
    <Box w="100%">
      <Flex
        alignItems="center"
        px={4}
        justifyContent="flex-end"
        background="lightenPrimary.200"
        color="white"
      >
        <LanguageDropDown options={[]} selectProps={{}} />
      </Flex>

      <Flex
        height="56px"
        alignItems="center"
        px="26px"
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
          <ChakraLink>
            <Link to="/">
              <img src={logoPath} alt="Logo" />
            </Link>
          </ChakraLink>
        </Flex>
        <Flex>
        {!isSearchOpened ? (
            <Box>
              <Button
                onClick={onSearchClick}
                padding="initial"
                bgColor="transparent"
              >
                <IconButton
                  icon={<BiSearch size={18} />}
                  aria-label="Search"
                  variant="ghost"
                  size="md"
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
            colorScheme="dark"
            icon={<AiOutlineUser />}
            aria-label="Profile"
            onClick={handleProfileClick}
            variant="ghost"
          />
          <Box pos="relative" onClick={handleCartClick}>
            <IconButton
              p="absolute"
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
            onCloseClick={onCloseSearch}
          />
        </Flex>
      ) : (
        <></>
      )}
      {isProfileDropdownOpen && isAuthenticated ? (
        <Box backgroundColor="white" width="100%" height="100%">
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
            <UserMenu {...userMenuProps} />
          </Flex>
        </Box>
      ) : (
        <></>
      )}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerBody>
            <SideMenu items={remappedItems} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
