import React from "react";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  BiSearch,
  GiHamburgerMenu,
  RiShoppingBagLine,
  BiMessageSquareDetail,
  BiShoppingBag,
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocalStorage } from "@rehooks/local-storage";
import { MiniHeaderProps } from "./types";
import IconButton from "../IconButton/IconButton";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
import SideMenu from "../SideMenu/SideMenu";
import { ReduxState } from "../../redux/types";
// import LebaraLogo from "../../assets/images/lebara-logo.svg";

const MiniHeader: React.FC<MiniHeaderProps> = ({logoPath}) => {
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [userToken] = useLocalStorage("userToken");

  const handleCartClick = () => {
    const hasDataPlan =
      cartItems.filter((t) => !t.isAddon && !t.duration.startsWith("Top-up"))
        .length > 0;
    history.push(
      cartItems.length === 0
        ? "/empty-cart"
        : userToken || !hasDataPlan
        ? userToken
          ? "/order-details"
          : "/login"
        : "/lebara-sim-choice"
    );
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  const items = [
    {
      title: "Shop",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/postpaid",
        },
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Add On",
          linkUrl: "/add-ons",
        },
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Top Up",
          linkUrl: "/top-up",
        },
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Phones",
          linkUrl: "/",
        },
      ],
    },
    {
      title: "My Lebara",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/",
        },
      ],
    },
    {
      title: "Help",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/",
        },
      ],
    },
    {
      title: "Refer & Earn",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/",
        },
      ],
    },
    {
      title: "Store Locator",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/",
        },
      ],
    },
    {
      title: "About Us",
      icon: BiShoppingBag,
      items: [
        {
          icon: <BiMessageSquareDetail color="secondary.600" />,
          title: "Sim Only",
          linkUrl: "/",
        },
      ],
    },
  ];
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
        alignItems="center"
        px={4}
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
          <IconButton
            icon={<BiSearch />}
            aria-label="Search"
            variant="ghost"
            colorScheme="dark"
          />
          <IconButton
            colorScheme="dark"
            icon={<AiOutlineUser />}
            aria-label="Profile"
            variant="ghost"
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
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerBody>
            <SideMenu items={items} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
