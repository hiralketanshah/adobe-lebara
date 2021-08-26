import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FooterUpperLinksProps, Links, PageLinks } from "./types";
import FooterMobileView from "../FooterMobileView/FooterMobileView";

const FooterUpperLinks: React.FC<FooterUpperLinksProps> = ({ links }) => {
  return (
    <>
      <FooterMobileView links={links} />
      <Box px="50px" py="50px" display={{ md: "block", base: "none" }}>
        <Box
          height={{ lg: "50vh", md: "initial" }}
          display={{ lg: "flex", md: "block" }}
        >
          <Box display="flex" justifyContent="space-between" width="40rem">
            {links.map((menuItem: Links) => (
              <Box background="white">
                <Text
                  fontSize={14}
                  color="lebaraChambray.500"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {menuItem.parentLinks.label}
                </Text>
                <Box>
                  {menuItem.childLinks.map((subMenuItem: PageLinks) => (
                    <a
                      href={subMenuItem.link}
                      style={{ textDecoration: "none" }}
                    >
                      <Text
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="14.06px"
                        color="black"
                        mt="2em"
                      >
                        {subMenuItem.label}
                      </Text>
                    </a>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <Box width="10rem">
            <></>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FooterUpperLinks;
