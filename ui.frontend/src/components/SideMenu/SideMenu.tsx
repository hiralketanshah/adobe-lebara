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
import Button from "@lebara/ui/src/components/Button/Button";
import {Box} from "@chakra-ui/layout";
import {IoClose} from "react-icons/all";
import aemUtils from "../../utils/aem-utils";

const SideMenu: React.FC<SideMenuProps> = ({ 
  items, onClose, 
  menuTitle = "Menu",
  topupCtaText = "Top Up +",
 }) => {
  const history = useHistory();

  const onMenuLinkNavigate = (url: any) => {
    if(!url) return null;
    return aemUtils.isCheckExternalLink(url) ? window.open(url, "_blank") : history.push(url);
  }

  return (
      <Flex flexDirection="column" h="100%">
        <Box h="80px" bg="lightenPrimary.500">
          <Flex alignItems="center" px="23px" py="20px">
            <Heading color="white" fontSize={26} lineHeight="34px">
              {menuTitle}
            </Heading>
            <Spacer />
            <IoClose size="24px" color="white" onClick={onClose}/>
          </Flex>
        </Box>

        <ChakraAccordion>
          {items?.map((item) => (
              <AccordionItem 
                key={item.title}
                className={`sidemenu-parent-level`}>
                <h2>
                  <AccordionButton h="52px"
                    _focus={{
                      outline: "none"
                    }}
                    onClick={() => item?.linkUrl && item?.items?.length === 0 ? onMenuLinkNavigate(item?.linkUrl) : null}>
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
                        onClick={() => onMenuLinkNavigate(item?.linkUrl)}
                      >
                        {item.title}
                      </Text>
                    </Flex>
                    {item.items && item.items.length !== 0 && <AccordionIcon/>}
                  </AccordionButton>
                </h2>
                {item.items && item.items.length !== 0 && <AccordionPanel pb={4}>
                {item.items?.map((subItem, cidx1) => (<>
                    {subItem?.items && subItem?.items.length > 0 ? (
                        <ChakraAccordion allowToggle>
                          <AccordionItem key={subItem.title}
                            className={`sidemenu-child-level1`}
                            borderBottomWidth={`${(cidx1 === (item?.items && item?.items?.length-1)) ? '0 !important' : '1px'}`}
                            >
                            <h2>
                              <AccordionButton
                                h="52px"
                                _focus={{
                                  outline: "none",
                                }}
                              >
                                <Flex textAlign="left" alignitem="center" flex={1}>
                                  {subItem.icon && (
                                    <Icon
                                      icon={subItem.icon}
                                      mr="24px"
                                      color="secondary.500"
                                      w={18}
                                      h={18}
                                    />
                                  )}
      
                                  <Text
                                    color="primary.600"
                                    fontWeight="bold"
                                    fontSize={14}
                                    onClick={() => onMenuLinkNavigate(subItem?.linkUrl)}
                                    >
                                    {subItem.title}
                                  </Text>
                                </Flex>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {subItem.items?.map((childSubItem) => (
                                <Button
                                  variant="ghost"
                                  leftIcon={childSubItem?.buttonIcon as JSX.Element}
                                  color="grey.300"
                                  isFullWidth
                                  fontSize={14}
                                  fontWeight={500}
                                  iconSpacing={5}
                                  justifyContent="flex-start"
                                  onClick={() =>
                                    childSubItem.linkUrl
                                      ? history.push(childSubItem.linkUrl)
                                      : null
                                  }
                                >
                                  {childSubItem.title}
                                </Button>
                              ))}
                            </AccordionPanel>
                          </AccordionItem>
                        </ChakraAccordion>
                      ) : (
                      <Button
                          variant="ghost"
                          leftIcon={subItem?.buttonIcon as JSX.Element}
                          color="grey.300"
                          isFullWidth
                          fontSize={14}
                          fontWeight={500}
                          iconSpacing={5}
                          justifyContent="flex-start"
                          onClick={() => onMenuLinkNavigate(subItem?.linkUrl)}
                      >
                        {subItem.title}
                      </Button>
                    )}
                    </>)
                )}
                </AccordionPanel>}
              </AccordionItem>
          ))}
        </ChakraAccordion>
        <Spacer />
        <Box px="20px" mb={320}>
          <Button isFullWidth onClick={() => history.push("/top-up")}>
            {topupCtaText}
          </Button>
        </Box>
      </Flex>
  );
};

export default SideMenu;
