import React from "react";
import { RouterLink } from "@lebara/ui/src/hooks/useHistory";
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
      pt="116px"
      display={{ md: "block", base: "none" }}
      bg={theme?.bgColor}
      color={theme?.color}
    >
      <Box
        height="initial"
        display={{ xl: "flex", lg:"block", md: "block" }}
        justifyContent="space-between"
        mb="8.135rem"
      >
        <Flex gridGap="70px">
          {footerUpperLinks?.map((menu: MenuProps, fmIdx) => (
            <Box key={`fm-key-${fmIdx}`}>
              <Text fontSize={14} fontWeight="bold" textTransform="uppercase" whiteSpace={'pre'}>
                {menu?.parentLinks?.label}
              </Text>
              <Flex direction="column">
                {menu?.childLinks?.map((subMenuItem: SubMenuProps, index) => (
                  <Text
                    key={index}
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="14.06px"
                    mt="30px"
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
        </Flex>
        {/* <Box width="1rem">
          <></>
        </Box> */}
        <Divider display={{ xl: "none", lg: "block" , md: "block" }} mt="2em" />
        <Box>
          <Box
            pl={{ xl: "5em", lg:'initial', md: "initial" }}
            mt={{ xl: "initial", lg:'2em' ,md: "2em" }}
          >
            <Text
              fontSize={14}
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.1px"
              lineHeight="20px"
              pb="18px"
            >
              {followus?.followUsText}
            </Text>
            <Box>
              <SocialMediaButtons buttons={followus?.links} color={theme?.color} />
            </Box>
            <Box px="10px">
              <Text
                fontSize={22}
                fontWeight="bold"
                textTransform="uppercase"
                mt="62px"
                mb="16px"
              >
                {getapp?.appTitle}
              </Text>
              {getapp?.links?.length > 1 && (
                <Flex>
                  <Link href={getapp?.links[0]?.link} isExternal>
                    <IconButton
                      variant="unstyled"
                      href={getapp?.links[0]?.link}
                      aria-label="Available on the App Store"
                      >
                      <Image
                        src={getapp?.links[0]?.label}
                        height="46"
                        width="156"
                       />
                    </IconButton>
                  </Link>
                  <Link href={getapp?.links[1]?.link} isExternal>
                    <IconButton
                      href={getapp?.links[1]?.link}
                      variant="unstyled"
                      ml="10px"
                      aria-label="Get it on google Play"
                    >
                      <Image
                        src={getapp?.links[1]?.label}
                        height="46"
                        width="156"
                      />
                    </IconButton>
                  </Link>
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider ml="-80px" w="calc(100% + 160px)" opacity={0.38} borderColor="grey.50"/>
      <Box color={theme?.color === "white" ? undefined : "grey.300"}>
        <Flex py="25px">
          {copyrightLinks?.map((linkItem, idx) => (<Link
            key={`copyright-link-${idx}`}
            as={RouterLink}
            to={linkItem?.link}
            py="10px"
            display="block"
            fontSize={14}
            textAlign="left"
            ml={idx > 0 ? '60px' : '0'}>
            {linkItem?.label}
          </Link>))}

          <Spacer />
          <Text fontSize={14} textAlign="right">
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
