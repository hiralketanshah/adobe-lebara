import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Accordion as ChakraAccordion,
  Flex,
  Text, Heading, Spacer,
} from "@chakra-ui/react";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import { SideMenuProps } from "./types";
import { Icon } from "@lebara/ui/src/components/Icon/Icon";
import Button from "../Button/Button";
import {Box} from "@chakra-ui/layout";
import {IoClose} from "react-icons/all";

const SideMenu: React.FC<SideMenuProps> = ({ 
  items, onClose, 
  menuTitle = "Menu",
  topupCtaText = "Top Up +",
 }) => {
  const history = useHistory();
  return (
      <Flex flexDirection="column" h="100%">
        <Box h="80px" bg="lightenPrimary.500">
          <Flex alignItems="center" px="23px" py="20px">
            <Heading color="white" fontSize={26} lineHeight="34px">
              {menuTitle}
            </Heading>
            <Spacer/>
            <IoClose size="24px" color="white" onClick={onClose}/>
          </Flex>
        </Box>

        <ChakraAccordion>
          {items?.map((item) => (
              <AccordionItem key={item.title}>
                <h2>
                  <AccordionButton h="52px"
                                   _focus={{
                                     outline: "none"
                                   }}
                    onClick={() => item?.linkUrl && item?.items?.length === 0 ? history.push(item?.linkUrl) : null}>
                    <Flex textAlign="left" alignItems="center" flex={1}>
                      {item.icon && (
                          <Icon
                              icon={item.icon}
                              mr="24px"
                              color="secondary.500"
                              w={18}
                              h={18}
                          />
                      )}
                      <Text color="primary.600" fontWeight="bold" fontSize={14}
                        onClick={() => item?.linkUrl ? history.push(item?.linkUrl) : null}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                    {item.items && item.items.length !== 0 && <AccordionIcon/>}
                  </AccordionButton>
                </h2>
                {item.items && item.items.length !== 0 && <AccordionPanel pb={4}>
                  {item.items?.map((subItem) => (
                      <Button
                          variant="ghost"
                          leftIcon={subItem.icon as JSX.Element}
                          color="grey.300"
                          isFullWidth
                          fontSize={14}
                          fontWeight={500}
                          iconSpacing={5}
                          justifyContent="flex-start"
                          onClick={() =>
                              subItem.linkUrl ? history.push(subItem.linkUrl) : null
                          }
                      >
                        {subItem.title}
                      </Button>
                  ))}
                </AccordionPanel>}
              </AccordionItem>
          ))}
        </ChakraAccordion>
        <Spacer/>
        <Box px="20px" my="37px">
          <Button isFullWidth onClick={() => history.push("/top-up")}>
            {topupCtaText}
          </Button>
        </Box>
      </Flex>
  );
};

export default SideMenu;
