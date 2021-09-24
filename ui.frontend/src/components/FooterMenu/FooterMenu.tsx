import React from "react";
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
}) => (
  <>
    <Box
      px="50px"
      py="50px"
      display={{ md: "block", base: "none" }}
      bg="primary.500"
      color="white"
    >
      <Box
        height={{ lg: "50vh", md: "initial" }}
        display={{ lg: "flex", md: "block" }}
      >
        <Box display="flex" justifyContent="space-between" width="40rem">
          {footerUpperLinks?.map((menu: MenuProps) => (
            <Box>
              <Text fontSize={14} fontWeight="bold" textTransform="uppercase">
                {menu?.parentLinks?.label}
              </Text>
              <Box>
                {menu?.childLinks?.map((subMenuItem: SubMenuProps, index) => (
                  <Text
                    key={index}
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="14.06px"
                    mt="2em"
                  >
                    {subMenuItem.label}
                  </Text>
                ))}
              </Box>
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
              <SocialMediaButtons buttons={followus?.links} />
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
              <Flex>
                <IconButton
                  as={Link}
                  href={getapp?.links[0].link}
                  aria-label="Available on the App Store"
                >
                  <Image src={getapp?.links[0].label} height="46" width="156" />
                </IconButton>
                <IconButton
                  as={Link}
                  href={getapp?.links[1].link}
                  ml="2em"
                  aria-label="Get it on google Play"
                >
                  <Image src={getapp?.links[1].label} height="46" width="156" />
                </IconButton>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider mt="2em" />
      <Box>
        <Flex py="25px">
          {copyrightLinks && (
            <Text fontSize={12} textAlign="left">
              {copyrightLinks[0]?.label}
            </Text>
          )}
          {copyrightLinks && (
            <Text fontSize={12} ml="60px" textAlign="left">
              {copyrightLinks[1]?.label}
            </Text>
          )}
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
      />
    </Box>
  </>
);

export default FooterMenu;
