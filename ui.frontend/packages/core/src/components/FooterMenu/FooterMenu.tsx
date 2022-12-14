import React from "react";
import { RouterLink } from "@lebara/core/hooks/useHistory";
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
import aemUtils from "../../utils/aem-utils";

const isCheckExternalLink = (url: any) => {
  if(!url) return false;
  return aemUtils.isCheckExternalLink(url);
}
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
                    <Link isExternal = {isCheckExternalLink(subMenuItem?.link)}
                      style={{color: theme?.color === "white" ? "white" : "black"}}
                      {... isCheckExternalLink(subMenuItem?.link) ? {href:subMenuItem?.link} : {as:RouterLink,to: subMenuItem?.link}}
                      >
                      {subMenuItem.label}
                    </Link>
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
                  {getapp?.links.map((obj, key)=>(
                    <Link href={obj?.link} isExternal>
                    <IconButton
                      variant="unstyled"
                      href={obj?.link}
                      ml={key > 0 ? "10px" : "0px"}
                      aria-label={obj?.ariaLabel!}
                      >
                      <Image
                        src={obj?.label}
                        height="46"
                        width="156"
                       />
                    </IconButton>
                  </Link>
                  ))}
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider ml="-80px" w="calc(100% + 160px)" opacity={0.38} borderColor="grey.50"/>
      <Box color={theme?.color === "white" ? undefined : "grey.300"}>
        <Flex py="25px">
          {copyrightLinks?.map((linkItem, idx) => (<Link isExternal = {isCheckExternalLink(linkItem?.link)}
            key={`copyright-link-${idx}`}
            {... isCheckExternalLink(linkItem?.link) ? {href:linkItem?.link} : {as:RouterLink,to: linkItem?.link}}
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
