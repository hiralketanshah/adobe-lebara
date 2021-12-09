import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Accordion as ChakraAccordion,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { SideMenuProps } from "./types";
import { Icon } from "../Icon/Icon";
import Button from "../Button/Button";

const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const history = useHistory();
  return (
    <ChakraAccordion>
      {items?.map((item) => (
        <AccordionItem key={item.title}>
          <h2>
            <AccordionButton h="52px"
              onClick={() => item?.linkUrl && item?.items?.length === 0 ? history.push(item?.linkUrl) : null}
            >
              <Flex textAlign="left" alignItems="center" flex={1}>
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    mr="24px"
                    color="secondary.600"
                    w={18}
                    h={18}
                  />
                )}
                <Text color="primary.600" fontWeight="bold" fontSize={14}>
                  {item.title}
                </Text>
              </Flex>
              {item.items && item.items.length !== 0 && <AccordionIcon />}
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
  );
};

export default SideMenu;
