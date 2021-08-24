import React from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Link,
} from "@chakra-ui/react";
import { GoPlus, FcMinus } from "react-icons/all";
import {
  FooterUpperLinksProps,
  Links,
  PageLinks,
} from "../FooterUpperLinks/types";
import color from "../../../color";

import {
  FooterMobileWrapper,
  AccordionButtonWrapper,
} from "./FooterMobileView.styles";

const Footer: React.FC<FooterUpperLinksProps> = ({ links }) => (
  <FooterMobileWrapper>
    <Accordion defaultIndex={[0]} allowMultiple>
      {links?.map((menuItem: Links) => (
        <AccordionItem borderTop="none" borderBottomWidth="1px">
          {({ isExpanded }) => (
            <>
              <Text as="h3" fontSize={14} fontWeight="bold">
                <AccordionButtonWrapper py="8px" px="16px">
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize={14}
                    letterSpacing="0.11em"
                    color={color.lebaraChambray[600]}
                    fontWeight="bold"
                    textTransform="uppercase"
                    py="15px"
                  >
                    {menuItem?.parentLinks?.label}
                  </Box>
                  {isExpanded ? (
                    <FcMinus
                      fontSize="12px"
                      color={color.lebaraChambray[600]}
                      fontWeight="bold"
                    />
                  ) : (
                    <GoPlus
                      fontSize="12px"
                      color={color.lebaraChambray[600]}
                      fontWeight="bold"
                    />
                  )}
                </AccordionButtonWrapper>
              </Text>
              <AccordionPanel pb={4}>
                {menuItem?.childLinks?.map((subMenuItem: PageLinks) => (
                  <Box px="16px">
                    <Link href={subMenuItem?.link} py="10px" display="block">
                      {subMenuItem?.label}
                    </Link>
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  </FooterMobileWrapper>
);

export default Footer;
