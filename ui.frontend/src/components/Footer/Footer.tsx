import React from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Divider,
  Flex,
  Link,
  Image,
} from "@chakra-ui/react";
import { RouterLink, useLocation } from "@lebara/ui/src/hooks/useHistory";
import { GoPlus, FcMinus } from "react-icons/all";
import IconButton from "../IconButton/IconButton";
import SocialMediaButtons from "../SocialMediaButtons/SocialMediaButtons";
import { FooterProps } from "./types";
import { useEffect } from "react";
import { jwtToken } from "@lebara/ui/src/components/UserDetails/constats";

const Footer: React.FC<FooterProps> = ({
  socialButtons,
  footerUpperLinks,
  copyrightText,
  getapp,
  followus,
  theme = { color: "lightenPrimary.50", bgColor: "primary.500" },
}) => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      const jwtCookie =getCookie("jwt_token");
      function getCookie(name : string) {
          var cookieArr = document.cookie.split(";");
          for(var i = 0; i < cookieArr.length; i++) {
              var cookiePair = cookieArr[i].split("=");
              if(name == cookiePair[0].trim()) {
                  return decodeURIComponent(cookiePair[1]);
              }
          }
          return "";
      }
      if(jwtCookie){
        document.getElementById("aklamio")?.setAttribute("data-aklamio-authentication-token", jwtCookie);
      }
    }, 10);
  }, [pathname]);
  return (
  <Box bg={theme?.bgColor} color={theme?.color}>
    <Accordion allowMultiple>
      {footerUpperLinks?.map((menu, index) => (
        <AccordionItem key={index} borderTop="none" borderBottomWidth="1px">
          {({ isExpanded }) => (
            <>
              <Text as="h3" fontSize={14} fontWeight="bold">
                <AccordionButton
                    _focus={{outline: "none"}}>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize={14}
                    letterSpacing="0.11em"
                    fontWeight="bold"
                    textTransform="uppercase"
                    py="15px"
                  >
                    {menu?.parentLinks?.label}
                  </Box>
                  {isExpanded ? (
                    <FcMinus fontSize="12px" fontWeight="bold" />
                  ) : (
                    <GoPlus fontSize="12px" fontWeight="bold" />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                {menu.childLinks?.map((subMenuItem, index) => (
                  <Box key={index}>
                    <Link to={subMenuItem.link} as={RouterLink} py="10px" display="block">
                      {subMenuItem.label}
                    </Link>
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>

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
      <Flex justifyContent="space-between">
        <Link href={getapp?.links && getapp?.links[0]?.link} isExternal>
          <IconButton
            as={Link}
            aria-label="Available on the App Store"
          >
          <Image src={getapp?.links && getapp?.links[0]?.label} height="46" width="156" />
          </IconButton>
        </Link>
        <Link href={getapp?.links && getapp?.links[1]?.link} isExternal>
          <IconButton
            as={Link}
            aria-label="Get it on google Play"
          >
            <Image src={getapp?.links && getapp?.links[1]?.label} height="46" width="156" />
          </IconButton>
        </Link>
      </Flex>
    </Box>

    <Divider pt="30px" />
    <Box px="10px" color="primary.500">
      <Text
          color={theme?.color}
        fontSize={14}
        fontWeight="bold"
        textTransform="uppercase"
        pt="30px"
        pb="20px"
      >
        {followus?.followUsText}
      </Text>
      <SocialMediaButtons buttons={followus?.links || []} color={theme?.color} />
    </Box>

    <Divider pt="30px" />
    <Text fontSize={12} textAlign="center" py="25px" color={theme?.color}>
      {copyrightText}
    </Text>
  </Box>
)
};

export default Footer;
