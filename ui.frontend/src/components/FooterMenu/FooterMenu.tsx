import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Divider,
  Flex,
  Link,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react";
import { FooterMenuProps, MenuProps, SubMenuProps } from "./types";
import SocialMediaButtons from "../SocialMediaButtons/SocialMediaButtons";
import IconButton from "../IconButton/IconButton";
import Footer from "../Footer/Footer";

const FooterMenu: React.FC<FooterMenuProps> = ({
  footerUpperLinks,
  copyrightText,
  copyrightLinks,
  getapp,
  followus,
  socialButtons,
  desktopFootertext,
  mobileTheme = { color: "white", bgColor: "primary.500" },
  theme = { color: "white", bgColor: "primary.500" },
}) => (
  <>
    <Box
      px="80px"
      py="116px"
      display={{ md: "block", base: "none" }}
      bg={theme?.bgColor}
      color={theme?.color}
    >
      <Box
        height={{ lg: "50vh", md: "initial" }}
        display={{ lg: "flex", md: "block" }}
        justifyContent="space-between"
        mb="8.135rem"
      >
        <Box display="flex" justifyContent="space-between" width="40rem">
          {footerUpperLinks?.map((menu: MenuProps, fmIdx) => (
            <Box key={`fm-key-${fmIdx}`}>
              <Text fontSize={14} fontWeight="bold" textTransform="uppercase">
                {menu?.parentLinks?.label}
              </Text>
              <Flex direction="column">
                {menu?.childLinks?.map((subMenuItem: SubMenuProps, index) => (
                  <Text
                    key={index}
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="14.06px"
                    mt="2em"
                    color={theme?.color === "white" ? "white" : "black"}
                  >
                    <RouterLink to={subMenuItem?.link}
                      style={{color: theme?.color === "white" ? "white" : "black"}}
                      >
                      {subMenuItem.label}
                    </RouterLink>
                  </Text>
                ))}
              </Flex>
            </Box>
          ))}
        </Box>
        <Box width="10rem">
          <></>
        </Box>
        <Divider display={{ lg: "none", md: "block" }} mt="2em" />
        <Box>
          <Box
            pl={{ lg: "5em", md: "initial" }}
            mt={{ lg: "initial", md: "2em" }}
          >
            <Text
              fontSize={14}
              fontWeight="bold"
              textTransform="uppercase"
              pb="10px"
              pl="15px"
            >
              {followus?.followUsText}
            </Text>
            <Box width="350px">
              <SocialMediaButtons buttons={followus?.links} color={theme?.color} />
            </Box>
            <Box px="10px">
              <Text
                fontSize={22}
                fontWeight="bold"
                textTransform="uppercase"
                mt="30px"
                mb="16px"
              >
                {getapp?.appTitle}
              </Text>
              {getapp?.links?.length > 1 && (
                <Flex>
                  <IconButton
                    as={Link}
                    href={getapp?.links[0]?.link}
                    aria-label="Available on the App Store"
                    >
                    <Image
                      src={getapp?.links[0]?.label}
                      height="46"
                      width="156"
                    />
                  </IconButton>
                  <IconButton
                    as={Link}
                    href={getapp?.links[1]?.link}
                    ml="2em"
                    aria-label="Get it on google Play"
                  >
                    <Image
                      src={getapp?.links[1]?.label}
                      height="46"
                      width="156"
                    />
                  </IconButton>
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider mt="2em" />
      <Box color={theme?.color === "white" ? undefined : "grey.300"}>
        <Flex py="25px">
          {copyrightLinks?.map((linkItem, idx) => (<Link 
            key={`copyright-link-${idx}`} 
            to={linkItem?.link} 
            py="10px" 
            display="block" 
            fontSize={12} 
            textAlign="left"
            ml={idx > 0 ? '60px' : '0'}>
            {linkItem?.label}
          </Link>))}
          
          <Spacer />
          <Text fontSize={12} textAlign="right">
            {copyrightText}
          </Text>
        </Flex>
      </Box>
    </Box>
    <Box display={{ base: "block", md: "none" }}>
      <Footer
        followus={followus}
        footerUpperLinks={footerUpperLinks}
        copyrightText={copyrightText}
        getapp={getapp}
        theme={mobileTheme}
      />
    </Box>
  </>
);

export default FooterMenu;
