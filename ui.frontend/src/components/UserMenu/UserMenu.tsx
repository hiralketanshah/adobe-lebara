import React from "react";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { MenuItem, UserMenuProps } from "./types";
import { useLazyQuery } from "@apollo/client";
import LOGOUT_USER from "../../graphql/LOGOUT_USER";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const UserMenu: React.FC<UserMenuProps> = ({ menus }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleMenuClick = (url: string) => history.push(url);
  const [logoutUser] = useLazyQuery(LOGOUT_USER);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    history.push("/");
  };
  return (
    <>
      {menus.map((menu: MenuItem) => (
        <Flex
          key={menu.key}
          borderBottomColor="lightCyan"
          borderBottomWidth="1px"
          mt="23px"
          alignItems="center"
          pb="20px"
          cursor="pointer"
          onClick={() => handleMenuClick(menu.url)}
        >
          <Img src={menu.icon} width="22px" height="16px" ml="20px" />
          <Text
            ml="25px"
            fontSize="14px"
            lineHeight="22px"
            textTransform="capitalize"
            color="primary.500"
          >
            {menu.name}
          </Text>
          <Box ml="auto">
            <IoIosArrowForward fill="#3D4998" />
          </Box>
        </Flex>
      ))}
      <Flex py="21px" justifyContent="center" onClick={handleLogout}>
        <Text
          cursor="pointer"
          fontSize="16px"
          lineHeight="25px"
          letterSpacing="0.01em"
          fontWeight="bold"
          color="grey.200"
        >
          LOG OUT
        </Text>
      </Flex>
    </>
  );
};

export default UserMenu;
