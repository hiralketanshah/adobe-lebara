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

const Footer: React.FC<FooterUpperLinksProps> = ({ footerUpperLinks }) => (
  /*<Box display={{ base: "block", md: "none" }}>
    <Accordion defaultIndex={[0]} allowMultiple>
      {links.map((menuItem: Links) => (
        <AccordionItem borderTop="none" borderBottomWidth="1px">
          {({ isExpanded }) => (
            <>
              <Text as="h3" fontSize={14} fontWeight="bold">
                <AccordionButton>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize={14}
                    letterSpacing="0.11em"
                    color="lebaraChambray.600"
                    fontWeight="bold"
                    textTransform="uppercase"
                    py="15px"
                  >
                    {menuItem?.parentLinks?.label}
                  </Box>
                  {isExpanded ? (
                    <FcMinus
                      fontSize="12px"
                      color="lebaraChambray.600"
                      fontWeight="bold"
                    />
                  ) : (
                    <GoPlus
                      fontSize="12px"
                      color="lebaraChambray.600"
                      fontWeight="bold"
                    />
                  )}
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                {menuItem?.childLinks?.map((subMenuItem: PageLinks) => (
                  <Box key={subMenuItem?.label}>
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
  </Box>
  */
 <></>
);

export default Footer;
